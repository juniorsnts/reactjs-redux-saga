import * as TodosActions from '../actions/TodoActions';
import { TodoService } from '../services/TodoService';

import { all, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

function* listAll() {
    const todoList = yield TodoService.list();
    yield put(TodosActions.listResponse(todoList));
}

function* watchListAll() {
    yield takeLatest(TodosActions.TODO_LIST, listAll);
}

function* create({ description }) {
    const newItem = yield TodoService.create({
        description,
        isChecked: false
    });
    yield put(TodosActions.create_response(newItem));
}

function* watchCreate() {
    yield takeEvery(TodosActions.TODO_CREATE, create);
}

function* remove({ id }) {
    TodoService.remove(id);
}

function* watchRemove() {
    yield takeEvery(TodosActions.TODO_REMOVE, remove);
}

function* clear() {
    const state = yield select(),
        todoList = state.TodoReducer;

    const newTodoList = todoList.filter(item => !item.isChecked),
        toRemove = todoList.filter(item => item.isChecked)
    toRemove.forEach(item => {
        TodoService.remove(item.id)
    });
    yield put(TodosActions.listResponse(newTodoList));
}

function* watchClear() {
    yield takeLatest(TodosActions.TODO_CLEAR, clear);
}

function* update({ item }){
    TodoService.update(item);
}

function* watchUpdate(){
    yield takeEvery(TodosActions.TODO_UPDATE, update);
}

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        watchCreate(),
        watchRemove(),
        watchClear(),
        watchUpdate(),
    ]);
}
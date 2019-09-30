import { TODO_CREATE_RESPONSE, TODO_CLEAR, TODO_REMOVE, TODO_UPDATE, 
TODO_LIST_RESPONSE } from '../actions/TodoActions';

const todoReducer = (todoList = [], action) => {
    switch (action.type) {
        case TODO_LIST_RESPONSE:
            return action.todoList

        case TODO_CREATE_RESPONSE:
            return [
                ...todoList,
                action.newItem
            ]

        case TODO_REMOVE:
            // return todoList.filter((item) => item.id !== action.id)
            const itemIndex = todoList.findIndex(item => item.id === action.id);
            return [...todoList.slice(0, itemIndex), ...todoList.slice(itemIndex + 1)]
            
        case TODO_UPDATE:
            return todoList.map((item) => {
                if (item.id === action.item.id) {
                    return action.item;
                }
                return item;
            })
            
        default:
            return todoList;
    }
}

export default todoReducer;
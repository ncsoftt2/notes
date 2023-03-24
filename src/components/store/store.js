import todo from './../3_Todo-list/TodoListSlice';
import {configureStore} from "@reduxjs/toolkit";

const stringMiddleware = () => (next) => (action) => {
    if(typeof store === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: {todo},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;
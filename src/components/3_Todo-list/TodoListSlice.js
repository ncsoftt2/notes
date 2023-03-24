import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";

const initialState = {
    data: [],
    activeFilter: 'all',
    todoLoadingStatus: 'idle'
}

export const fetchTodo = createAsyncThunk(
    'todo/fetchTodo',
    async() => {
        const {request} = useHttp();
        return await request('http://localhost:3000/todo')
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state,action) => {
            state.data = [...state.data, action.payload]
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
        activeFilterTodo: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, state => {
                state.todoLoadingStatus = 'loading'
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.todoLoadingStatus = 'idle'
                state.data = action.payload
            })
            .addCase(fetchTodo.rejected, state => {
                state.todoLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = todoSlice;
export default reducer;
export const {todoFetched,addTodo,deleteTodo,activeFilterTodo} = actions
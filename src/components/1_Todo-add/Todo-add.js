import './Todo-add.css';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {useHttp} from "../hooks/http.hook";
import {addTodo} from "../3_Todo-list/TodoListSlice";
import moment from 'moment';

const TodoAdd = () => {

    const [title,setTitle] = useState('')
    const [completed,setCompleted] = useState(false)
    const dispatch = useDispatch();
    const {request} = useHttp();
    const onSubmitTodo = async (e) => {
        e.preventDefault();
        let newTodo = {
            id: uuidv4(),
            title: title,
            completed: completed,
            date: moment().format('DD.MM.YYYY')
        }
        if(title.trim() === '') return
        await request('http://localhost:3000/todo', 'POST', JSON.stringify(newTodo))
            .then(dispatch(addTodo(newTodo)))
        setTitle('')
    }
    return (
            <form onSubmit={onSubmitTodo} className={'input_block'}>
                <input type='text'
                       name='title'
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       placeholder={'Добавить заметку'}
                />
                <input hidden value={completed} type={'checkbox'} onChange={setCompleted}/>
                <button className={'btn_add_todo'}>+</button>
            </form>
    )
}

export default TodoAdd;
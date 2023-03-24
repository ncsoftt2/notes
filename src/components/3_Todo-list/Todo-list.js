import './Todo-list.css';
import {useDispatch, useSelector} from "react-redux";
import TodoListItem from "../4_Todo-list-item/Todo-list-item";
import {useEffect, useState} from "react";
import {deleteTodo, fetchTodo} from "./TodoListSlice";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useHttp} from "../hooks/http.hook";
import {Spinner} from "../Spinner/Spinner";
import {createSelector} from "reselect";

const TodoList = (props) => {

    useEffect(() => {
        dispatch(fetchTodo())
    },[])
    const [valueInput,setValueInput] = useState('');
    const {request} = useHttp();
    const dispatch = useDispatch()
    const {todoLoadingStatus} = useSelector((state) => state.todo)

    const onDelete = async(id) => {
        await request(`http://localhost:3000/todo/${id}`, 'DELETE')
            .then(dispatch(deleteTodo(id)))
    }

    const filterTodo = createSelector(
        (state) => state.todo.activeFilter,
        (state) => state.todo.data,
        (filter,data) => {
            if(filter === 'all') {
                return data
            } else if(filter === 'completed') {
                return data.filter(item => item.completed)
            } else if(filter === 'notcompleted') {
                return data.filter(item => !item.completed)
            }
        }
    )
    const filteredTodoList = useSelector(filterTodo)
    if(todoLoadingStatus === 'loading') {
        return <div className={'loading_status'}><Spinner /></div>
    }
    if(todoLoadingStatus === 'error') {
        return <div className={'loading_status'}>Error!
        </div>
    }


    const renderItems = (arr) => {
        if(arr.length === 0) {
            return (
                <CSSTransition
                    timeout={100}
                    classNames="alert">
                    <div className={'alert'}>Здесь пока ничего нет</div>
                </CSSTransition>

            )
        }
        return (
            arr.filter(({title}) => title.toLowerCase().includes(valueInput.trim().toLowerCase())
            ).map(({id,...props},i) => {
                return (
                    <CSSTransition
                        key={id}
                        timeout={300}
                        classNames="todo">
                        <TodoListItem onDelete={() => onDelete(id)} i={i} id={id} {...props} />
                    </CSSTransition>
                )
            })
        )
    }

    const elements = renderItems(filteredTodoList)
    return (
        <div>
            <div className={'search_input'}>
                <input placeholder='Найти запись' type='text' value={valueInput} onChange={(e) => setValueInput(e.target.value)}/>
            </div>
            <TransitionGroup component="div" className={'todo_list_block'} >
                {elements}
            </TransitionGroup>
        </div>

    )

}

export default TodoList;

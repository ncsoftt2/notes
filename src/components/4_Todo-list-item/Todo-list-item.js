import {useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useDispatch} from "react-redux";
import './Todo-list-item.css';
import {fetchTodo} from "../3_Todo-list/TodoListSlice";


const TodoListItem = (props) => {

    useEffect(() => {
        setTodoTitle(props.title)
        setIncrease(props.increase)
    },[props.title,props.increase])

    const [completed,setCompleted] = useState(props.completed)
    const [title,setTodoTitle] = useState(props.title)
    const date = useState(props.date)

    const [editMode,setEditMode] = useState(false)
    const {request} = useHttp();
    const dispatch = useDispatch();

    const todoUpdate = async() => {
        let item = {title,increase,date}
        await request(`http://localhost:3000/todo/${props.id}`,
            "PUT",
            JSON.stringify(item),
            {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
            },
        )
        dispatch(fetchTodo())
    }

    const activeEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        todoUpdate()
    }
    let classNames = 'todo_title '
    if(increase) {
        classNames += 'active '
    }

    return (
        <>
            {!editMode &&
                <div className={'todo_list_item'}>
                    <div>{props.i + 1}</div>
                    <div className={classNames} onClick={activeEditMode}>{title}</div>
                    <div>{props.date}</div>
                    <button className={'btn_delete'} onClick={props.onDelete}>&times;</button>
                </div>
            }
            {editMode &&
                <div className='todo_list_item'>
                    <div className={'todo_list_edit'}>
                        <div className={'todo_edit_input'}>
                            <input type='text' value={title} onChange={(e) => setTodoTitle(e.currentTarget.value)} autoFocus={true}/>
                        </div>
                        <div className={'todo_edit_checkbox'}>
                            <input type='checkbox' value={completed} checked={completed} onChange={() => setIncrease(!completed)}/>
                        </div>
                    </div>
                    <div>
                        <button className={'btn-save'} onClick={deactivateEditMode}>Сохранить</button>
                    </div>
                </div>
            }
        </>
    )
}
export default TodoListItem;

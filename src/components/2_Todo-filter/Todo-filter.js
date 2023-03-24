import './Todo-search.css';
import {useDispatch, useSelector} from "react-redux";
import {activeFilterTodo} from "../3_Todo-list/TodoListSlice";
import classNames from "classnames";


const TodoFilter = () => {
    const {activeFilter} = useSelector(state => state.todo)
    const btnsData = [
        {name: 'all', label:'Все'},
        {name: 'completed', label: 'Выполненые'},
        {name: 'notcompleted', label: 'Невыполненые'},
    ]

    const dispatch = useDispatch()
    const buttons = btnsData.map(({name,label}) => {
        const btnClass = classNames('btn', {
            'active': name === activeFilter
        });
        return (
            <button key={name} className={`${btnClass} btn_filter`} onClick={() => dispatch(activeFilterTodo(name))}>{label}</button>
       )
    })

    return (
        <div className={'todo_search_block'}>
            {buttons}
        </div>
    )
}

export default TodoFilter;
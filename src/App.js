import './App.css';
import TodoList from "./components/3_Todo-list/Todo-list";
import TodoAdd from "./components/1_Todo-add/Todo-add";
import TodoFilter from "./components/2_Todo-filter/Todo-filter";

const App = () => {
    return (
        <div className='app'>
            <header className={'todo_items'}>
                <TodoAdd />
                <div>
                    <TodoFilter />
                </div>
            </header>
            <TodoList />
        </div>
    )
}

export default App;

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, removeTodoOptimistic, saveTodo } from "../store/actions/todo.actions.js"
import { SET_FILTER_BY } from '../store/reducers/todo.reducer.js'

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos()
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onRemoveTodo(todoId) {
        removeTodoOptimistic(todoId)
            .then(() => showSuccessMsg('Car removed'))
            .catch(err => showErrorMsg('Cannot remove car'))
    }

    function onEditTodo(todo) {
        const importance = +prompt('New importance?', todo.importance)
        const todoToSave = { ...todo, importance }

        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo updated to importance: ${savedTodo.importance}`)
            })
            .catch(() => {
                showErrorMsg(`Cannot update todo`)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    return (
        <div className='todo-index'>
            <h3>Todos App</h3>
            <main>
                <section>
                    <button className='add-btn'><Link to={`/todo/edit`}>Add Todo</Link></button>
                </section>
                <TodoFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading
                    ? <TodoList
                        todos={todos}
                        onRemoveTodo={onRemoveTodo}
                        onEditTodo={onEditTodo}
                        onToggleTodo={onToggleTodo}
                    />
                    : <div>Loading..</div>
                }
                <hr />
            </main>
        </div>	
    )
}
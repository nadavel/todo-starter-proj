import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTodo, loadTodos, saveTodo, setTodo } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoEdit() {
    const todoToEdit = useSelector(storeState => storeState.todoModule.selectedTodo)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading) 

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        loadTodo()
         
    }, [])
    
    async function loadTodo() { 
        await getTodo(params.todoId)
        showSuccessMsg(`Todo loaded`)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        console.log(`saving changes`);
            
        setTodo({...todoToEdit, [field]: value })
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then((savedTodo) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }

        
    const { txt, importance, isDone } = todoToEdit || {txt:'', importance:'', isDone:''}

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}
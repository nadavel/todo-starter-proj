import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTodo } from "../store/actions/todo.actions.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoDetails() {
    const todo = useSelector(storeState => storeState.todoModule.selectedTodo)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading) 
    const params = useParams()
    const navigate = useNavigate()
    


    useEffect(() => {
        getTodo(params.todoId)
            .then((todo) =>{
                console.log(todo);
                
                showSuccessMsg(`Todo loaded successfully`)
            })
    }, [params.todoId])


    function onBack() {
        // If nothing to do here, better use a Link
        navigate('/todo')
        // navigate(-1)
    }

    return (
        <main>
            {!isLoading && todo ? 
                <section className="todo-details">
                    <h1 className={(todo.isDone)? 'done' : ''}>{todo.txt}</h1>
                    <h2>{(todo.isDone)? 'Done!' : 'In your list'}</h2>
    
                    <h1>Todo importance: {todo.importance}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
                    <button onClick={onBack}>Back to list</button>
                    <div>
                        <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link> |
                        <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
                    </div>
                </section>
                : <div>Loading..</div>
            }
        </main>
    )
}
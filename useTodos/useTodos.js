import { useEffect, useReducer } from "react"
import { todoReducer } from "../todoReducer";



export const useTodos = () => {

    const init = () => {
        return JSON.parse( localStorage.getItem('todos') || [] )
    }

    const initialState = [
        {
            id: 33333,
            descripcion: 'miguel',
            done: false,
        }
    ];

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        console.log('funciona', todo);
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }

        dispatch(action);
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = ( id ) => {
       dispatch({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }

    const todosCount = () => {
        return todos.length;
    }

    const pendingTodosCount = () => {
        return todos.filter( todo => !todo.done).length
    }
  return {

    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todos,
    todosCount,
    pendingTodosCount,


  }
}

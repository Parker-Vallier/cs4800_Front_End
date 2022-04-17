import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

// Imported uuidv4 to create random keys for items
import {v4 as uuidv4}  from 'uuid'

// Key for todo list stored on local storage
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // TodoList state, the list of todos
  const [todos, setTodos] = useState([])

  // Used to get info from input bar
  const todoNameRef = useRef()
  
  // This useEffect updates once, when the page refreshes
  // It takes the todo list stored in local data and sets our todo list equal to that list
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // This useEffect updates everytime [todos] updates, so anytime a new todo is added, removed, or changed the complete status
  // It saves this newly changed todo list into local data
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // Toggles the todo items state of completeness
  function toggleTodo(id) {
    // Copies the old todo list into a new list
    const newTodos = [...todos]
    // finds the todo item with the id passed to it
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    // then sets our todo list to the updated todo list
    setTodos(newTodos)
  }
  
  // Function to add new todo items to the todo list
  function handleAddTodo(e) {
    // Grabs info from input box
    const name = todoNameRef.current.value
    if(name === '') return
    // Tacks the item onto the old list
    setTodos(prevTodo => {
      return [...prevTodo, {id: uuidv4(), name: name, complete: false}]
    })
    // Empties the input box
    todoNameRef.current.value = null
  }

  // Used to remove completed items from the todo list
  function handleClearTodos(){
    // Filters out any items that are completed from the todo list
    const newTodos = todos.filter(todo => !todo.complete)
    // sets todo list to the filtered list
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;

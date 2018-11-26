const uuid = require('uuid/v4')
const moment = require('moment')
const React = require('react')
const ReactDOM = require('react-dom')

// Adding Header 
  const App = () => { 
      return  <div> <h1>TO-DO APP</h1>
        <p>What do you need to do next</p>
    </div> ;
  }
 //const App = React.createElement("h1", {id:"someid"}, "Something new")
ReactDOM.render(<App /> , document.querySelector('#todo-head'));

// Retrive the Saved Todo to diplay on screen
const getSavedTodos = () => {
    // Get Todo from DB in JSON format
    // Right now get from local storage
   // console.log('In Saved Todo')
    const todosJSON = localStorage.getItem('todos')
   // console.log(todosJSON)
    try {
        console.log(JSON.parse(todosJSON))
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    } 
}

// Render all the todo based on 
// Filter selected - 
//      Search Text
//      Hide Completed
const renderTodos = (todos, filter) => {
    console.log("Render Todo")
    const todoEl = document.querySelector('#todos');
    const filteredTodo = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompleteMatch = !filter.hideCompleted || !todo.completed
        return searchTextMatch && hideCompleteMatch
    })
    
    todoEl.innerHTML = ''
    const incompletefilter = filteredTodo.filter((todo) => !todo.completed)
    getSummaryTodo(incompletefilter)

    if(filteredTodo.length > 0) {
        filteredTodo.forEach((note) => {
            todoEl.appendChild(generateTodoDOM(note, filter))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No To-do to show'
        todoEl.appendChild(messageEl)
     }
}

/* Add new Todo to the todo array but pushing all the values including new ID
   Save updated todo
   Rerender todo on screen 
   */
  const addNewToDo = (todos, newTodoTitle, filter) => {

    // Push the new title to the todo
    todos.push({
        id:uuid(), 
        title:newTodoTitle,
        completed: false
    })
    // Save after adding new Todo
    saveTodos(todos)
    // Rerender once the Todo has been updated
    renderTodos(todos, filter)
}


// Save all the Todo after adding new todo or removing a todo
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove Todo based on passed ID 
const removeTodo = (id) => {
    console.log("Removing a Todo");
    var todos = getSavedTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    console.log(todos);
    saveTodos(todos);
   // renderTodos(todos,filter);
}

/* Toggle todo completed flag on selected todo */
const toggleTodo = (id) => {
    console.log("Toggle")
    var todos = getSavedTodos();
    const todo = todos.find((todo) => todo.id === id) 
    if(todo) {
        todo.completed = !todo.completed
    }
    saveTodos(todos)
}

/* Create summary of all pending todo */
const getSummaryTodo = (incompleteTodo) => {

    const summary = document.createElement('h2');
    const plural = incompleteTodo.length > 1 ? 's' : ''
    console.log(`You have ${incompleteTodo.length} todo${plural} left to complete`)

    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodo.length} todo${plural} left to complete`
    document.querySelector('#todos').appendChild(summary)

}

const generateTodoDOM = (todo, filter) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div')
    const checkEl = document.createElement('input')
    const textEl = document.createElement('span')
    const buttonEl = document.createElement('button')
    checkEl.setAttribute('type', 'checkbox')
    buttonEl.textContent = 'remove'
    buttonEl.classList.add('button', 'button--text')
    
    checkEl.checked = todo.completed;

    if(todo.completed) {
        checkEl.setAttribute('checked', 'true')
    }
    containerEl.appendChild(checkEl)
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')

    buttonEl.addEventListener('click', (e) => {
        removeTodo(todo.id)
       // saveTodos(todos)
      //  renderTodos(todos, filter)

    })
    checkEl.addEventListener('change', (e) => {
        toggleTodo(todo.id);

    })
    //let temp = ''
    //if (todo.completed) { temp= 'Done' } else { temp = 'Not Done' }
    textEl.textContent = ` ${todo.title} `
    containerEl.appendChild(textEl);
    todoEl.appendChild(containerEl)
    todoEl.appendChild(buttonEl);

    return todoEl;
}


module.exports = {
    renderTodos, 
    getSavedTodos,
    addNewToDo,
    saveTodos,
    removeTodo,
    toggleTodo
};

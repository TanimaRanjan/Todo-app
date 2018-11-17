console.log("In Todo JS")

const uuid = require('uuid/v4')
const moment = require('moment')
const React = require('react')
const ReactDOM = require('react-dom')


// Adding Header 
  const App = () => { 
      return <div><h1>TO-DO APP</h1><p>What do you need to do next</p></div> 
  }
 //const App = React.createElement("h1", {id:"someid"}, "Something new")

ReactDOM.render(<App /> , document.querySelector('#todo-head'));



// Retrive the Saved Todo to diplay on screen
var getSavedTodos = () => {
    // Get Todo from DB in JSON format
    // Right now get from local storage
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (error) {
        return []
    }
    
}


// Render all the todo based on 
// Filter selected - 
//      Search Text
//      Hide Completed
var renderTodos = (todos, filter) => {
    
    console.log("Rendering -- ")
    console.log(` Filter Search ${filter.searchText}`)
    console.log(` Hide Completed or not  ${filter.hideCompleted}`)

    const filteredTodo = todos.filter((todo) => {
        // Search for the title that matches the text passed in filter
        const searchTextMatch = todo.title.toLowerCase().includes(filter.searchText.toLowerCase())
        const hideCompletedMatch = !filter.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompletedTodo = filteredTodo.filter((todo) => !todo.completed)
    getSummaryTodo(incompletedTodo)

    //const todoEl = document.createElement('p');

   
    if(filteredTodo.length > 0) {
        filteredTodo.forEach(todo => {
            console.log(`Title - ${todo.title}    completed - ${todo.completed}    Id - ${todo.id}`)
            
            const App = () => {
                return <div>{todo.title} {todo.completed}</div>
            }
            ReactDOM.render(<App />
                , document.querySelector('#todos') );
        
        });
    } else {
        console.log('No TO-DO to display')
    }

   //const todoEl = document.querySelector('#todos')

}

/* Add new Todo to the todo array but pushing all the values including new ID
   Save updated todo
   Rerender todo on screen 
   */

var addNewToDo = (todos, newTodoTitle) => {
    
    //console.log("Adding a new Todo")
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
var saveTodos = (todos) => {
    console.log("Saving the Todo")
    localStorage.setItem('todos', JSON.stringify(todos))


}


// Remove Todo based on passed ID 
var removeTodo = (id) => {
    console.log("Removing a Todo");
    var todos = getSavedTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    saveTodos(todos);
    //renderTodos(todos,todosJS.filter);
}

/* Toggle todo completed flag on selected todo */

var toggleTodo = (id) => {

    var todos = getSavedTodos();
    const todo = todos.find((todo) => todo.id === id) 
    if(todo) {
        todo.completed = !todo.completed
    }
    saveTodos(todos)
}

/* Create summary of all pending todo */
var getSummaryTodo = (incompleteTodo) => {

    const plural = incompleteTodo.length > 1 ? 's' : ''
    console.log(`You have ${incompleteTodo.length} todo${plural} left to complete`)

    const App = () => {
        return <div>You have {incompleteTodo.length} todo{plural} left to complete</div>
    }
    ReactDOM.render(<App />, document.querySelector('#todo-summary') );
}


const generateTodoDOM = (todo) => {
    const todoEl = document.createElement
}

module.exports = {
    renderTodos, 
    getSavedTodos,
    addNewToDo,
    saveTodos,
    removeTodo,
    toggleTodo
};



/*
const generateTodoDOM = (todo) => {

// React.createElement --- 

    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkEl = document.createElement('input');
    const textEl = document.createElement('span');
    const buttonEl = document.createElement('button');


    checkEl.setAttribute('type', 'checkbox')
    buttonEl.textContent = 'remove';
    //Add the class from css
    buttonEl.classList.add('button', 'button--text')

    checkEl.checked = todo.completed;

    if(todo.completed) {
        checkEl.setAttribute('checked', 'true')
    } 
    containerEl.appendChild(checkEl);

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')

    buttonEl.addEventListener('click', (e) => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })

    checkEl.addEventListener('change', (e) => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })

    let temp = ''
    if (todo.completed) { temp= 'Done' } else { temp = 'Not Done' }
    textEl.textContent = ` ${todo.title} - ${temp} `
    containerEl.appendChild(textEl);
    todoEl.appendChild(containerEl)
    todoEl.appendChild(buttonEl);

    return todoEl;
}

const renderTodos = (todos, filters) => {

    const todoEl = document.querySelector('#todos');
    const filteredTodo = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompleteMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompleteMatch
    })
    
    todoEl.innerHTML = ''
    const incompletefilter = filteredTodo.filter((todo) => !todo.completed)

    getSummaryTodo(incompletefilter)

    if(filteredTodo.length > 0) {
        filteredTodo.forEach((note) => {
            todoEl.appendChild(generateTodoDOM(note))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No To-do to show'
        todoEl.appendChild(messageEl)
    }
}*/
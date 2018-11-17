
// Application starts here. It is the initialization file 
console.log("Starting To Do App")

// const express = require('express')
// const os = require('os')

// const app = express();
// app.use(express.status("dist"))
// app.get("/", (req, res) => 
//     res.send({username: os.uderInfo().username})
// );
// app.listen(8080, () => console.log("Listening to port 8080"));

// Calling todo.js using requre method. it needs relative path
const todosJS = require('./todo.js')

// Get Saved Notes
const todo = todosJS.getSavedTodos();

const filter = {
    searchText: '',
    hideCompleted: false
}


// Render Notes on Screen 
// List of the Todo 
todosJS.renderTodos(todo, filter)

// Add Todos button clicked.
document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    // Remove extra spaces from the title
    let newtodoEl = e.target.elements.newtodo.value.trim()
    // Check if length of text entered in more than 0
    if(newtodoEl.length > 0) {
        console.log(`Add New Todo ${newtodoEl}`)
        //var newTodoTitle = e.target.elements.newtodo.value
        // Add new Todo when add button is clicked. 
        todosJS.addNewToDo(todo, newtodoEl)
    } else {
        console.log(`Nothing to add `)
    }
    e.target.elements.newtodo.value=''

})

// Add Search todo 
document.querySelector('#search-todo').addEventListener('input', (e) => {
    e.preventDefault()
    filter.searchText=e.target.value
    console.log(`"Search for Todo ${filter.searchText}`)
    todosJS.renderTodos(todo, filter)
    filter.searchText=''
    

})


// When clicked on Hide Completed 
document.querySelector('#hide-done').addEventListener('change', (e) => {
    e.preventDefault()
    filter.hideCompleted=e.target.checked
    console.log(`Hide Completed Todo ${filter.hideCompleted}`)
    todosJS.renderTodos(todo, filter)
})


// Mark a Todo as completed when checkbox is selected

// Remove a Todo when remove button is selected
//todosJS.removeTodo('ec19123d-6c1c-424b-99ea-ecd672d67f94')

// Toggle Todo 
//todosJS.toggleTodo('78a002c1-9256-4960-8bc1-98dd13efb559')

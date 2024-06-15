// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem("nextID", JSON.stringify(nextID));
    return nextID;
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('taskCard');
    localStorage.setItem("nextID", JSON.stringify(nextID));
    return nextID;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();   

    const title = $('#task-title');
    const dueDate = $('#task-due-date');
    const formattedDueDate = dayjs(dueDate).format('MMMM D, YYYY');
    const description = $('#task-description');

     
    const newTask = {
        nextID: generateTaskId(),
        title: title,
        dueDate: formattedDueDate,
        description: description
        };
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#task-due-date').datepicker();
    $('#task-form').submit(handleAddTask);
    renderTaskList();
    $('.delete-btn').click(handleDeleteTask);
});

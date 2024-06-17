// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    let id = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {
   const card = $(`
    <div class="card task-card mb-3" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
        <button class="btn btn-danger delete-task">Delete</button>
      </div>
    </div>
  `);

  const today = dayjs();
  const dueDate = dayjs(task.dueDate);
  if (dueDate.isBefore(today, "day")) {
    card.addClass("bg-danger text-white");
  } else if (dueDate.diff(today, "day") <= 2) {
    card.addClass("bg-warning text-white");
  }


  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskList = JSON.parse(localStorage.getItem("tasks"));



}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();   

    const title = $("#task-title").val();
    const dueDate = $("#task-due-date").val();
    const formattedDueDate = dayjs(dueDate).format("MMMM D, YYYY");
    const description = $("#task-description").val();

    const newTask = {
      id: generateTaskId(),
      title: title,
      dueDate: formattedDueDate,
      description: description,
    };



    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    const taskCard = createTaskCard(newTask);
    $("#todo-cards").append(taskCard);

    $("#task-title").val("");
    $("#task-due-date").val("");
    $("#task-description").val("");

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskCard = $(event.target).parent().parent(".task-card");
  const taskId = taskCard.attr("data-id");
  taskList = taskList.filter((task) => parseInt(taskId));
  localStorage.setItem("tasks", JSON.stringify(taskList));
  taskCard.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#task-due-date').datepicker();
    $('#task-form').submit(handleAddTask);
    renderTaskList();

    $(document).on("click", ".delete-task", handleDeleteTask);
});

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// create a function to generate a unique task id
function generateTaskId() {
    let id = nextId;
    nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
    
}

// create a function to create a task card
function createTaskCard(task) {
   const card = $(`
    <div class="card task-card mb-3" style="max-width: 18rem;" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small style="color: black;">Due: ${task.dueDate}</small></p>
        <button class="btn btn-danger delete-task" style="border: 1px solid white;">Delete</button>
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

// create a function to render the task list and make cards draggable
function renderTaskList() {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    $("#todo-cards, #in-progress-cards, #done-cards").empty();

    $.each(taskList, function (index, task) {
      const taskCard = createTaskCard(task);
      if (task.status === "to-do") {
        $("#todo-cards").append(taskCard);
      } else if (task.status === "in-progress") {
        $("#in-progress-cards").append(taskCard);
      } else if (task.status === "done") {
        $("#done-cards").append(taskCard);
      }
    });

    $(".task-card").draggable({
      revert: "invalid",
      containment: ".swim-lanes",
      start: function () {
        $(this);
      },
      stop: function () {
        $(this);
      },
    });

    $(".lane").droppable({
            accept: ".task-card",
            drop: handleDrop,
        });
    
    }

// create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();   

    const title = $("#task-title").val();
    const dueDate = $("#task-due-date").val();
    const formattedDueDate = dayjs(dueDate).format("MMMM D, YYYY");
    const description = $("#task-description").val();
    const status = "to-do";
    const newTask = {
            id: generateTaskId(),
            title,
            dueDate: formattedDueDate,
            description, 
            status
        };

    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));

    const taskCard = createTaskCard(newTask);
    $("#todo-cards").append(taskCard);

    $("#task-title").val("");
    $("#task-due-date").val("");
    $("#task-description").val("");

function initializeDraggable() {
  $(".task-card").draggable({
    revert: "invalid",
    containment: ".swim-lanes",
    start: function () {
      $(this);
    },
    stop: function () {
      $(this);
    },
  });
}

    initializeDraggable();

    }


// create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskCard = $(event.target).closest(".task-card");
  const taskId = taskCard.attr("data-id");
  taskList = taskList.filter((task) => task.id != taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  taskCard.remove();
}

// create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const droppedCard = ui.draggable;
  const droppedCardId = droppedCard.attr("data-id");
  const newLaneId = $(this).attr("id");

  const updatedTask = taskList.find(
    (task) => task.id === parseInt(droppedCardId)
  );
  if (updatedTask) {
    updatedTask.status = newLaneId;
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  $(this).append(droppedCard);

  droppedCard.css({ 
    top: 0,
    left: 0,
    width: "100%",
    maxWidth: "18rem",
    height: "auto",
  });

  $(this).css("background-color", "#f8f9fa");

  droppedCard.draggable({
    revert: "invalid",
    containment: ".swim-lanes",
    start: function () {
      $(this);
    },
    stop: function () {
      $(this);
    },
  });
}

// when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#task-due-date').datepicker();
    $('#task-form').submit(handleAddTask);
    renderTaskList();

    $(document).on("click", ".delete-task", handleDeleteTask);
});

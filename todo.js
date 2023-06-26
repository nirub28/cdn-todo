let tasks = [];  // to store all tasks
let uncomplete=[]; // to store uncompleted tasks
let completed=[];  // to store completed tasks
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");


//to create an li tag
function addTasksToList(task) {
  const li = document.createElement("li");

  li.innerHTML = `
           <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="round-checkbox">
           <label for="${task.id}">${task.input}</label>
           <img src="https://cdn-icons-png.flaticon.com/256/1617/1617543.png" class="delete" data-id="${
             task.id
           }" />
   `;
  taskList.append(li);
}

function renderList() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTasksToList(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}


//to render uncompleted tasks
function renderList1(uncomplete) {
  taskList.innerHTML = "";

  for (let i = 0; i < uncomplete.length; i++) {
    addTasksToList(uncomplete[i]);
  }
}

//to render completed tasks
function renderList2(completed) {
  taskList.innerHTML = "";

  for (let i = 0; i < completed.length; i++) {
    addTasksToList(completed[i]);
  }
}

//to mark task as completed 
function markTaskAsComplete(taskId) {
  const task = tasks.filter((task) => {
    return task.id == taskId;
  });

  if (task.length > 0) {
    const completeTask = task[0];
    completeTask.done = !completeTask.done; // to toggle check box to mark complet and not
    renderList();
    return;
  }
}

//to mark all tasks as completed 
function markAllTaskAsComplete(tasks){
     for( let i=0;i<tasks.length;i++){
        const task = tasks[i];
        task.done=true;    
        }
     renderList();
     return;
}


// delete a task
function deleteTask(taskId) {
  const newTasks = tasks.filter((task) => {
    return task.id !== taskId; // it will remove the task with taskId matches from array
  });

  tasks = newTasks; // as we render tasks array, we need latest array after deleting task
  renderList();
}

// delete all completed tasks
function deleteCompleted(){
  const completedTask = tasks.filter((task) => {
    return task.done === false; 
  });

  tasks = completedTask; 
  renderList();
}


// to show uncomplted tasks
function showUncompleted(tasks){
  const uncompltedTasks = tasks.filter((task) => {
    return task.done === false; 
  });

  uncomplete = uncompltedTasks; 
  renderList1(uncomplete);
}


//to show complted tasks
function showCompleted(tasks){
  const CompletedTasks = tasks.filter((task) => {
    return task.done === true; 
  });

  completed = CompletedTasks; 
  renderList2(completed);
}

//to add task
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    return;
  }
}

// to show notification when try to add empty task
function showNotification(text) {
  alert(text);
}

function handleInputKeyPress(e) {
  if (e.key === "Enter") {
    // when enter key pressed trigger this

    const input = e.target.value;

    if (!input) {
      showNotification("Task cant be empty");
      return;
    }

    const task = {
      input,
      id: Date.now().toString(), // as we need reference to delete a task
      done: false, // to store if task is complted or not
    };

    e.target.value = ""; // to clear a input text box, once submitted
    addTask(task);
  }
}

function handleClickEvent(e) {
  const target = e.target;

  // console.log('target is',target);

  if (target.className === "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "round-checkbox") {
    const taskId = target.id;
    markTaskAsComplete(taskId);
    return;
  }
  else if(target.className === "complete-all-tasks"){
       markAllTaskAsComplete(tasks);
       return;
  }
  else if(target.className === "clear-completed"){
    deleteCompleted();
    return;
   }
   else if(target.className === "all"){
    renderList();
    return;
   }
   else if(target.className === "uncomplete"){
    showUncompleted(tasks);
    return;
   }
   else if(target.className === "completed"){
    showCompleted(tasks);
    return;
   }
   
  
}

addTaskInput.addEventListener("keyup", handleInputKeyPress);
document.addEventListener("click", handleClickEvent);

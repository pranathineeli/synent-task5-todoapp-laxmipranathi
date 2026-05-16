const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

  taskList.innerHTML = "";

if(tasks.length === 0){
  emptyMessage.style.display = "block";
}
else{
  emptyMessage.style.display = "none";
}

 tasks
.filter(task => {

  if(currentFilter === "pending"){
    return !task.completed;
  }

  if(currentFilter === "completed"){
    return task.completed;
  }

  return true;

})
.forEach((task,index)=>{

    const li = document.createElement("li");

    if(task.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `
      <span>${task.text}</span>

      <div class="task-buttons">

        <button class="complete-btn">
          ✔
        </button>

        <button class="delete-btn">
          ✖
        </button>

      </div>
    `;

    const completeBtn = li.querySelector(".complete-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click",()=>{

      tasks[index].completed = !tasks[index].completed;

      saveTasks();
      renderTasks();

    });

    deleteBtn.addEventListener("click",()=>{

      tasks.splice(index,1);

      saveTasks();
      renderTasks();

    });

    taskList.appendChild(li);
const remainingTasks = tasks.filter(task => !task.completed).length;

taskCounter.textContent = `Tasks Remaining: ${remainingTasks}`;
  });

}

addBtn.addEventListener("click",()=>{

  const taskText = taskInput.value.trim();

  if(taskText === ""){
    return;
  }

  tasks.push({
    text:taskText,
    completed:false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";

});
taskInput.addEventListener("keypress",(e)=>{

  if(e.key === "Enter"){
    addBtn.click();
  }

});
allBtn.addEventListener("click",()=>{

  currentFilter = "all";
  renderTasks();

});

pendingBtn.addEventListener("click",()=>{

  currentFilter = "pending";
  renderTasks();

});

completedBtn.addEventListener("click",()=>{

  currentFilter = "completed";
  renderTasks();

});
renderTasks();
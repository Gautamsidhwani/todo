const input = document.querySelector("#ipbox");
const ul = document.querySelector("ul");
const btn = document.querySelector(".btn");

function addTask() {
    if (input.value === '') {
        alert("Add a valid Task");
    } else {
        const task = document.createElement('li');
        const taskContent = document.createElement('span');
        taskContent.innerText = input.value;
        taskContent.contentEditable = true; 

      
        taskContent.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
        editBtn.classList.add("edit", "btn");
        editBtn.addEventListener('click', function() {
            taskContent.focus(); 
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteBtn.classList.add("delete", "btn");
        deleteBtn.addEventListener('click', function() {
            task.remove();
            saveTasks(); 
        });

        task.appendChild(taskContent);
        task.appendChild(editBtn);
        task.appendChild(deleteBtn);
        ul.appendChild(task);
        
        saveTasks(); 
    }
    input.value = "";
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        addTask();
    }
}

function saveTasks() {
    const tasks = [];
    ul.querySelectorAll('li').forEach((task, index) => {
        tasks.push({
            id: index,
            content: task.querySelector('span').innerText
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        const taskContent = document.createElement('span');
        taskContent.innerText = task.content;
        taskContent.contentEditable = true;

        taskContent.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
        editBtn.classList.add("edit", "btn");
        editBtn.addEventListener('click', function() {
            taskContent.focus();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteBtn.classList.add("delete", "btn");
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(taskContent);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

btn.addEventListener('click', addTask);
input.addEventListener('keypress', handleKeyPress);
ul.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
});

const body = document.body;
body.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
    }
});

window.addEventListener('load', loadTasks);

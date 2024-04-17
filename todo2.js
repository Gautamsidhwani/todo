const input = document.querySelector("#ipbox");
const ul = document.querySelector("ul");
const btn = document.querySelector(".btn");

function addTask() {
    if (input.value === '') {
        alert("Add valid Task");
    } else {
        const task = document.createElement('li');
        const taskContent = document.createElement('span');
        taskContent.innerText = input.value;
        taskContent.contentEditable = true; // Make the task content editable

        // Prevent new lines when Enter key is pressed
        taskContent.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
        editBtn.classList.add("edit", "btn");
        editBtn.addEventListener('click', function() {
            taskContent.focus(); // Set focus to the task content for immediate editing
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteBtn.classList.add("delete", "btn");
        deleteBtn.addEventListener('click', function() {
            task.remove();
        });

        task.appendChild(taskContent);
        task.appendChild(editBtn);
        task.appendChild(deleteBtn);
        ul.appendChild(task);
    }
    input.value = "";
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        addTask();
    }
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

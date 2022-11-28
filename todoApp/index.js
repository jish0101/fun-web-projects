const formEl = document.querySelector("form");

const inputEL = document.querySelector(".input");

const todosEL = document.querySelector(".todos");

const addBtn = document.querySelector(".add");

const clearBtn = document.querySelector(".clear");

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach(todo => {
    createTodo(todo);
  })
}

// console.log(todos);
// console.log(todos[0].text.value);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  createTodo();
  updateLS();
});

addBtn.addEventListener("click", () => {
  createTodo();
  updateLS();
});

clearBtn.addEventListener("click", () => {
  clearAll();
});

function createTodo(object) {

  if (object) {
    const todo = document.createElement("li");
    todo.innerText = object.text;
    todo.classList.add("toClear");
    if (object.completed) {
      todo.classList.add("hidden");
    }
    hideAndDelete(todo);
    addTodo(todo);
  }

  const todoText = inputEL.value;
  if (todoText) {
    const todo = document.createElement("li");
    todo.innerText = todoText;
    todo.classList.add("toClear");
    hideAndDelete(todo);
    addTodo(todo);
  }
}

function addTodo(todo) {
  todosEL.appendChild(todo);
  inputEL.value = "";
}

function hideAndDelete (todo) {
  todo.addEventListener("click", () => {
    todo.classList.toggle("hidden");
    updateLS();
  })
  todo.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    todo.remove();
    updateLS();

  });
}


function clearAll() {
  const toClearEl = document.querySelectorAll(".toClear");
  toClearEl.forEach((li) => {
    li.remove();
  });
  updateLS();
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach((todoEL) => {
    todos.push({
      text: todoEL.innerText,
      completed: todoEL.classList.contains("hidden"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

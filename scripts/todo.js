"use strict";
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// Lấy userArr từ localStorage
let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

// Lấy currentUser từ localStorage
const currentUser = getFromStorage("currentUser");
let activeUser;
const index = userArr.findIndex((user) => user.userName === currentUser);
index !== -1 && (activeUser = userArr[index]);

let toDoArr = getFromStorage("toDoArr");
!toDoArr && (toDoArr = []);

const inputTask = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const toDoListContainer = document.getElementById("todo-list");

// Hàm render TODOLIST ra màn hình
const renderToDoList = function () {
  toDoListContainer.removeEventListener("click", handleToDoList);
  toDoListContainer.innerHTML = "";

  toDoArr.forEach((row, id) => {
    if (row.owner === currentUser) {
      const html = `<li ${
        row.isDone ? `class="checked"` : ``
      } data-task-id=${id}>${row.task}<span class="close">×</span></li>`;
      toDoListContainer.insertAdjacentHTML("beforeend", html);
    }
  });
  toDoListContainer.addEventListener("click", handleToDoList);
};

// Hàm xử lý ToDoList
const handleToDoList = function (e) {
  if (e.target.tagName === "SPAN") {
    const clicked = e.target.closest("li");
    // Xóa một ToDo Item
    const id = clicked.dataset.taskId;
    toDoArr.splice(id, 1);
    renderToDoList();
    updateToStorage("toDoArr", toDoArr);
    return;
  }

  // Xử lý toggle trạng thái COMPLETED
  const id = e.target.dataset.taskId;
  toDoArr[id].isDone = !toDoArr[id].isDone;
  renderToDoList();
  updateToStorage("toDoArr", toDoArr);
};

// Bắt sự kiện click vào nút add
addBtn.addEventListener("click", function () {
  if (inputTask.value === "") {
    alert("Please enter data for task!");
    return;
  }

  toDoArr.push(new Task(inputTask.value, currentUser, false));
  renderToDoList();
  updateToStorage("toDoArr", toDoArr);
  inputTask.value = "";
});

if (currentUser) {
  const activeUser = userArr[index];
  renderToDoList(activeUser);
}

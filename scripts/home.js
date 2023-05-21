"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMess = document.getElementById("welcome-message");
const logoutBtn = document.getElementById("btn-logout");

let userArr = getFromStorage("userArr");
let currentUser = getFromStorage("currentUser");
// Khi người dùng chưa đăng nhập, ẩn đi nút logout, chỉ hiển thị nút login và register
loginModal.hidden = false;
mainContent.hidden = true;

var index = userArr.findIndex((user) => user.userName === currentUser);
// console.log(index);

// Nếu người dùng đã đăng nhập, hiển thị thông điệp "Welcome + Firstname" và nút logout
if (currentUser) {
  loginModal.hidden = true;
  mainContent.hidden = false;
  welcomeMess.insertAdjacentHTML(
    "beforeend",
    `Welcome ${userArr[index].firstName}`
  );
}

// Bắt sự kiện click vào nút Logout
logoutBtn.addEventListener("click", function () {
  updateToStorage("currentUser", "");
  window.location.reload(); // Sau khi người dùng logout, tải lại trang index.html
});

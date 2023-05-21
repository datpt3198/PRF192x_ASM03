"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const submitBtn = document.getElementById("btn-submit");

// Lấy userArr từ localStorage
let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

// Bắt sự kiện click vào nút submit login
submitBtn.addEventListener("click", function () {
  const userName = inputUsername.value;
  const password = inputPassword.value;
  if (userName === "") {
    alert("Please enter user_name");
    return;
  }
  if (password === "") {
    alert("Please enter password");
    return;
  }

  let checkUsername = false;
  let checkPass = false;

  for (const user of userArr) {
    checkUsername ||= user.userName === userName;
    checkPass ||= user.password === password;
    if (user.login(userName, password)) {
      saveToStorage("currentUser", userName);
      window.location.href = "../index.html"; // Khi đăng nhập thành công chuyển về trang index.html
    }
  }

  if (!checkUsername) {
    alert("Your username is not found, please check again!");
    return;
  } else if (!checkPass) {
    alert("Wrong password!");
    return;
  }
});

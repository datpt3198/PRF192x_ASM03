"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passConfirmInput = document.getElementById("input-password-confirm");

const submitRegister = document.getElementById("btn-submit");

let validate = true;

let userArr = getFromStorage("userArr");
!userArr && (userArr = []);

// Hàm kiểm tra dữ liệu nhập vào
const validator = function () {
  if (firstNameInput.value === "") {
    alert("First name cannot be empty!");
    validate = false;
    return;
  }

  if (lastNameInput.value === "") {
    alert("Last name cannot be empty!");
    validate = false;
    return;
  }
  if (userNameInput.value === "") {
    alert("User name cannot be empty!");
    validate = false;
    return;
  }
  if (passwordInput.value === "") {
    alert("Password cannot be empty!");
    validate = false;
    return;
  }
  if (passConfirmInput.value === "") {
    alert("Confirm password cannot be empty!");
    validate = false;
    return;
  }

  if (userArr.find((user) => user.userName === userNameInput.value)) {
    alert(`This username is already used. Please try another one!`);
    validate = false;
    return;
  }

  if (passwordInput.value !== passConfirmInput.value) {
    alert(`Confirm Password is not correct. Please checked!`);
    validate = false;
    return;
  }
  if (passConfirmInput.value.length <= 8) {
    alert("Password phải nhiều hơn 8 kí tự");
    validate = false;
    return;
  }
  return validate;
};

// Bắt sự kiện click vào nút submit
submitRegister.addEventListener("click", function () {
  validator();
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const userName = userNameInput.value;
  const password = passwordInput.value;

  if (validate) {
    alert(
      `Account with username ${userName} has been successfully registered. Please login to read news now!`
    );

    userArr.push(new User(firstName, lastName, userName, password));
    updateToStorage("userArr", userArr);
    window.location.href = "../pages/login.html"; // Sau khi success Register sẽ chuyển sang trang login
  } else {
    window.location.reload();
  }
});

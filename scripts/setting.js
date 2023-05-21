"use strict";

let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

const currentUser = getFromStorage("currentUser");

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const submitBtn = document.getElementById("btn-submit");

if (currentUser) {
  const index = userArr.findIndex((user) => user.userName === currentUser);
  const activeUser = userArr[index];
  // Đặt giá trị khỏi tạo Initial
  pageSizeInput.value = activeUser.newsPerPage;
  categoryInput.value = activeUser.newsCategory;

  // Bắt sự kiện vào nút submit
  submitBtn.addEventListener("click", function () {
    if (pageSizeInput.value === "") {
      alert("Please enter the number of newsletters per page!");
      return;
    }
    userArr[index].newsPerPage = Number(pageSizeInput.value);
    userArr[index].newsCategory = categoryInput.value;
    updateToStorage("userArr", userArr);
    // alert('Settings have been saved successfully')
    window.location.href = "../pages/news.html";
  });
}

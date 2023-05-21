"use strict";
// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=API_KEY  (URL API)
/* - Trên User.js khởi tạo 1 class User với 4 trường thông tin của user(4 trường này sẽ nhận value từ inputform trên trang register.js)
   - Ngoài ra còn thêm 2 trường là newsPerPage và newCategory làm tham số cho URL API (2 trường này sẽ được đặt mặc định và có thể thay đổi trong trang setting.js)
   - Các phương thức cần dùng trong login.js là login() và new.js là urlApiNews() 
*/

// Đăng nhập https://newsapi.org để get key
// Key dự phòng: c3c9627bfd12494c992e5d7bee1e5dba
// const apiKey = `6a37ce985929422894b2458258305a67`;
const apiKey = `c3c9627bfd12494c992e5d7bee1e5dba`;

class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }

  newsPerPage = 5;
  newsCategory = "General";

  login(userName, password) {
    return userName === this.userName && password === this.password;
  }

  urlApiNews(page = 1) {
    return `https://newsapi.org/v2/top-headlines?country=us&category=${this.newsCategory.toLowerCase()}&pageSize=${
      this.newsPerPage
    }&page=${page}&apiKey=${apiKey}`;
  }
}

// Hàm chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );
  user.newsPerPage = userData.newsPerPage;
  user.newsCategory = userData.newsCategory;
  return user;
}

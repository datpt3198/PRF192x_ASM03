"use strict";
const labelPageNum = document.getElementById("page-num");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");

// Lấy userArr từ localStorage
let userArr = getFromStorage("userArr");
!userArr && (userArr = []);
userArr = userArr.map((user) => parseUser(user));

// Lấy currentUser từ localStorage
const currentUser = getFromStorage("currentUser");
let activeUser;
const index = userArr.findIndex((user) => user.userName === currentUser);

let newsPerPage = 5,
  pageNum = Number(labelPageNum.textContent);
index !== -1 && (activeUser = userArr[index]);
index !== -1 && (newsPerPage = activeUser.newsPerPage);
newsContainer.classList.add("container");

// Hàm tải và render bài viết lên màn hình
const handleLoadNews = async function (page = 1) {
  if (!currentUser) return;
  try {
    const res = await fetch(activeUser.urlApiNews(page));
    if (!res.ok) throw new Error("Fetch failed!");
    const data = await res.json();
    renderNews(data.articles);

    page === 1 ? (prevBtn.hidden = true) : (prevBtn.hidden = false);
    page * newsPerPage >= data.totalResults
      ? (nextBtn.hidden = true)
      : (nextBtn.hidden = false);
  } catch (err) {
    console.error(err.message);
  }
};

// Render News ra màn hình
const renderNews = function (articles) {
  newsContainer.innerHTML = "";
  for (let i = 0; i < articles.length; i++) {
    const { title, description, url, urlToImage } = articles[i];
    const html = `
  <div class="row" style="margin-bottom: 20px">
    <div class="col-4">
      <img src="${urlToImage}" class="img-fluid" alt="${title}">
    </div>
    <div class="col-8">
      <h5>${title}</h5>
      <p>${description}</p>
      <button type="button" class="btn btn-primary" href="${url}">View</button>
    <div>
  <div>
  `;
    newsContainer.insertAdjacentHTML("beforeend", html);
  }

  newsContainer.addEventListener("click", handleViewBtn);
};

// Hàm xử lý 2 nút điều hướng số thứ tự trang hiện tại
const handleNavBtn = async function (e) {
  if (e.target.getAttribute("id") === "btn-next") pageNum++;
  else pageNum--;
  await handleLoadNews(pageNum);
  labelPageNum.textContent = pageNum;
};

// Hàm xử lý khi người dùng click nút View
const handleViewBtn = function (e) {
  let clicked = e.target.closest("button");
  if (clicked.tagName === "BUTTON") {
    window.location.assign(clicked.getAttribute("href"));
  }
};

handleLoadNews(1);
prevBtn.addEventListener("click", handleNavBtn);
nextBtn.addEventListener("click", handleNavBtn);

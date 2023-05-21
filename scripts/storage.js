"use strict";

// Hàm lưu dữ liệu vào local storage (hàm nhận 2 tham số là key và value)
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// Hàm lấy dữ liệu từ local storage theo key tương ứng
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// Hàm xóa dữ liệu khỏi local storage theo key
const removeFromStorage = function (key) {
  localStorage.removeItem(key);
};

// Hàm cập nhật lại giá trị cho local storage
function updateToStorage(key, newValue) {
  removeFromStorage(key);
  saveToStorage(key, newValue);
}

function clearStorage() {
  localStorage.clear();
}

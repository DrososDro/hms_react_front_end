export { setItemLocalStorage, getItemLocalStorage, deleteItemLocalStorage }
function setItemLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getItemLocalStorage(key) {
  const item = localStorage.getItem(key)
  return JSON.parse(item)
}
function deleteItemLocalStorage(key) {
  localStorage.removeItem(key)
}

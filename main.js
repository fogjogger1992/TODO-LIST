// 初始變數
const listToDo = document.querySelector('#my-todo')
const listDone = document.querySelector('#my-done')
const addBtn = document.querySelector('#addBtn')
const clearBtn = document.querySelector('#clearBtn')
const input = document.querySelector('#newTodo')
const card = document.querySelector('.card')
const count = document.querySelector('#count')

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addToDoItem(todo)
  countToDo()
}

// To-Do Count
function countToDo() {
  let countToDo = listToDo.childElementCount
  let countDone = listDone.childElementCount
  let countTotal = countToDo + countDone
  count.innerHTML = `${countDone}/${countTotal}`
}

// Add to To-Do
function addToDoItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="fas fa-minus-square delete"></i>`
  listToDo.appendChild(newItem)
  resetAlert()
}

// Add to Done
function addDoneItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="done" class="checked">${text}</label>
    <i class="fas fa-minus-square delete"></i>`
  listDone.appendChild(newItem)
}

// Clear input
function clearInput() {
  return input.value = ''
}

// Alert
function alert() {
  input.classList.add("is-invalid")
  input.value = ''
  input.placeholder = "empty item"
}

function resetAlert() {
  input.classList.remove("is-invalid");
  input.placeholder = "add item";
}

// Create new To-Do
// Click
addBtn.addEventListener('click', function () {
  const inputValue = input.value
  if (inputValue.trim().length !== 0) {
    addToDoItem(inputValue)
    clearInput()
    countToDo()
  } else if (inputValue.trim().length === 0) {
    alert()
  }
})

// Reset Input Alert
input.addEventListener('focus', function () {
  resetAlert()
})

// Enter
input.addEventListener('keypress', event => {
  const inputValue = input.value
  if (inputValue.trim().length !== 0 && event.keyCode == 13) {
    addToDoItem(inputValue)
    clearInput()
    countToDo()
  } else if (inputValue.trim().length === 0 && event.keyCode == 13) {
    alert()
  }
})

// Check and Delete
card.addEventListener('click', function (event) {
  const target = event.target
  const parentElement = target.parentElement
  const grandParentElement = parentElement.parentElement

  // Delete
  if (target.classList.contains('delete')) {
    parentElement.remove()
    countToDo()
    // Check
  } else if (target.tagName === 'LABEL') {
    target.classList.toggle('checked')
    // Move To-Do <-> Done
    const text = target.innerText
    if (grandParentElement.classList.contains('todo')) {
      addDoneItem(text)
      parentElement.remove()
      countToDo()
    } else if (grandParentElement.classList.contains('done')) {
      addToDoItem(text)
      parentElement.remove()
      countToDo()
    }
  }
})

// Done Clear All
clearBtn.addEventListener('click', function (event) {
  const target = event.target
  const doneUl = target.parentElement.nextElementSibling
  doneUl.innerHTML = ''
  countToDo()
})
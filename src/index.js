import { taskReducer } from './src/reducers/reducer.js'
import{ newTask, removeTask, strokeTask, updateTask } from './src/actions/actions.js'

let data= document.querySelector('.tasks__data')
let addBtn= document.querySelector('.add')
let taskInput = document.querySelector('.input-task')
let taskTitle = document.querySelector('.tasks__title');
let footer = document.querySelector('footer');
let closeModal = document.querySelector('.modal__close');
let modalWindow = document.querySelector('.container__modal');
let modalInput = document.querySelector('.form-update__input');
let modalCancel = document.querySelector('.form-update__button-cancel');
let modalUpdate = document.querySelector('.form-update__button-update');
let today = new Date().getFullYear();
let store =Redux.createStore(taskReducer);

footer.innerHTML  = `&copy Gary Yaral ${today} `

if (store.getState().length > 0) {
  taskTitle.classList.remove('hidden');
  data.classList.remove('hidden');
} else {
  taskTitle.classList.add('hidden');
  data.classList.add('hidden');
}

store.subscribe(() => {
  //reset all values
  data.innerHTML = "";
  taskInput.value = "";
  
  if (store.getState().length > 0) {
    taskTitle.classList.remove('hidden');
    data.classList.remove('hidden');
  } else {
    taskTitle.classList.add('hidden');
    data.classList.add('hidden');
  }

  store.getState().forEach(task =>{
    //We create a new task
    let taskContainer = document.createElement('div');
    taskContainer.classList.add('task'); 
    let taskLi = document.createElement('div'); 
    taskLi.classList.add('task__text');
    task.done === false ? "" : taskLi.classList.add('strike');
    taskLi.id = task.id;
    taskLi.innerHTML = task.value;
    //We create a button remove then add it to the task
    let buttonRemove = document.createElement('a');
    buttonRemove.classList.add('delete');
    buttonRemove.innerHTML = `<ion-icon name="trash"></ion-icon>`;
    buttonRemove.setAttribute('href','')
    buttonRemove.setAttribute('idToRemove', task.id)
    // We added click event each button
    buttonRemove.addEventListener('click', (e) => {
      e.preventDefault();
      let id = buttonRemove.getAttribute('idToRemove');
      store.dispatch(removeTask(id));

      if (store.getState().length === 0) {
        taskTitle.classList.add('hidden');
      }

    })

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('checked');
    task.done === false ? checkBox.checked = false : checkBox.checked = true;
    checkBox.setAttribute('idToStroke', task.id)
    // We added click event each button
    checkBox.addEventListener('click', (event) => {
      let id = event.target.getAttribute('idToStroke');
      let isDone = event.target.checked;
      store.dispatch(strokeTask(id, isDone));
    })

    let updateButton = document.createElement('a');
    updateButton.classList.add('update');
    updateButton.innerHTML = `<ion-icon name="create"></ion-icon>`;
    updateButton.setAttribute('href','')
    updateButton.setAttribute('idToUpdate', task.id)
    // We added click event each button
    updateButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      let id = updateButton.getAttribute('idToUpdate');
      let content = store.getState().filter(task => task.id === parseInt(id))
      modalWindow.setAttribute('idToUpdate', id)
      modalInput.value = content[0].value;
      modalWindow.classList.remove('hidden');
      modalInput.focus();
    })

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('container__buttons');
    buttonsContainer.appendChild(updateButton);  
    buttonsContainer.appendChild(buttonRemove);

    taskContainer.appendChild(checkBox);
    taskContainer.appendChild(taskLi);  
    taskContainer.appendChild(buttonsContainer);  
    data.appendChild(taskContainer);
  })
})

addBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (taskInput.value === "") return;
  let value = taskInput.value;
  store.dispatch(newTask(value))
  taskInput.focus();
})

closeModal.addEventListener('click', () => {
  modalWindow.classList.add('hidden');
})

modalUpdate.addEventListener('click', () => {
  let parent = modalUpdate.parentNode.parentNode.parentNode
  let id = parent.getAttribute('idToUpdate')
  if(modalInput.value !== "") {
    let newValue = modalInput.value;
    store.dispatch(updateTask(id, newValue))
    modalInput.value = "";
    modalWindow.removeAttribute('idToUpdate');
    modalWindow.classList.add('hidden');
  }
})

modalCancel.addEventListener('click', () => {
  modalInput.value = "";
  modalWindow.removeAttribute('idToUpdate');
  modalWindow.classList.add('hidden');
})




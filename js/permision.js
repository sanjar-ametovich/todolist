import { getData } from "./utils.js";

let adminList = document.querySelector('.admin-list')
let makeAdmin = document.querySelector('#makeAdmin')
export default class Users {
  constructor() {
    this.users = getData("users")
  }

  renderUser(data) {
    adminList.innerHTML = "";
    data.forEach((item) => {
      adminList.insertAdjacentHTML('afterbegin', `
        <li class="users" id="${item.id}">
          <p>${item.login}</p>
          <button id="change">Change</button>
          <button id="delete">Delete</button>
        </li>
      `);
    });

  }

  addUser(data) {
    let user = JSON.parse(localStorage.getItem("users")) || [];
    user.push(data);
    localStorage.setItem("users", JSON.stringify(user));
    this.renderUser(user);
  }

  deleteTask(id) {
    let filteredUsers = getData("users").filter((task) => task.id != id);

    localStorage.setItem("users", JSON.stringify(filteredUsers));
    this.renderUser(filteredUsers);
  }

  showPasswordSymbols(input) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);
  }

  generatePassword(input) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let string_length = 8;
    let randomstring = '';
    for (let i = 0; i < string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    input.value = randomstring
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);
  }
  changeUser(id) {
    let user = this.users.filter((user) => user.id == id);
    return user;
  }

  editUser(id, admin, login, password) {
    this.users.forEach((item) => {
      if (item.id == id) {
        item.password = password;
        item.login = login;
        if (admin.checked == true) {
          let makeAdminSecond = document.querySelector('#make-admin_second');
          makeAdminSecond.checked = true;
          admin.checked = true;
        }
      }
    });

    let loginEdit = document.querySelector('.admin-settings__text');
    let passwordEdit = document.querySelector('.admin-settings__password');
    loginEdit.value = login;
    passwordEdit.value = password;
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);
  }

  DragAndDrop() {
    let userActive = document.querySelector('.admin-settings-active')
    let userAvailable = document.querySelector('.admin-settings-available')

    this.users.map((item) => {
      if(item.isAdmin === true){
        
        if (item.canAdd && item.canDelete && item.canEdit) {
          userActive.insertAdjacentHTML('beforeend', `
              <div class='skill' draggable='true'>Can add</div>
              <div class='skill' draggable='true'>Can delete</div>
              <div class='skill' draggable='true'>Can edit</div>
            `)
  
        } else
          if (!item.canAdd && !item.canDelete && !item.canEdit) {
            userAvailable.insertAdjacentHTML('beforeend', `
              <div class='skill' draggable='true'>Can add</div>
              <div class='skill' draggable='true'>Can delete</div>
              <div class='skill' draggable='true'>Can edit</div>
            `)
  
          } else
            if (!item.canAdd && item.canDelete && item.canEdit) {
              userActive.insertAdjacentHTML('beforeend', `
              <div class='skill' draggable='true'>Can delete</div>
              <div class='skill' draggable='true'>Can edit</div>
           `)
              userAvailable.insertAdjacentHTML('beforeend', `
            
              <div class='skill' draggable='true'>Can add</div>
           `)
  
            } else
              if (item.canAdd && !item.canDelete && item.canEdit) {
                userActive.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can add</div>
                <div class='skill' draggable='true'>Can edit</div>
              `)
                userAvailable.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can delete</div>
             `)
  
              } else
                if (item.canAdd && item.canDelete && !item.canEdit) {
                  userActive.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can add</div>
                <div class='skill' draggable='true'>Can delete</div>
              `)
                  userAvailable.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can edit</div>
              `)
  
                } else
                  if (!item.canAdd && !item.canDelete && item.canEdit) {
                    userActive.insertAdjacentHTML('beforeend', `
                    <div class='skill' draggable='true'>Can edit</div>
                  `)
                    userAvailable.insertAdjacentHTML('beforeend', `
                    <div class='skill' draggable='true'>Can add</div>
                    <div class='skill' draggable='true'>Can delete</div>
                  `)
  
                  } else
                    if (item.canAdd && !item.canDelete && !item.canEdit) {
                      userActive.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can add</div>
              `)
                      userAvailable.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can edit</div>
                <div class='skill' draggable='true'>Can delete</div>
              `)
  
                    } else
                      if (!item.canAdd && item.canDelete && !item.canEdit) {
                        userActive.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can delete</div>
              `)
                        userAvailable.insertAdjacentHTML('beforeend', `
                <div class='skill' draggable='true'>Can add</div>
                <div class='skill' draggable='true'>Can edit</div>
            `)
                      }
      }


    })
    let noteInner = document.querySelectorAll('.admin-settings-permission')

    noteInner.forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        e.target.classList.add('hide')

      })
      item.addEventListener('dragover', (e) => {
        e.preventDefault()
        e.target.classList.add('hovered')
      })
      item.addEventListener('dragleave', (e) => {
        e.preventDefault()
        e.target.classList.remove('hovered')
      })
      item.addEventListener('drop', (e) => {
        e.preventDefault()
        let dragged = document.querySelector('.hide')
        let hovered = document.querySelector('.hovered')
        e.target.appendChild(dragged)
        dragged.classList.remove('hide')
        this.users.map((item) => {
          if (e.target == userActive) {
            if (dragged.textContent == 'canAdd') {
              item.canAdd = true
            }
              else if (dragged.textContent === 'CanEdit') {
              item.canEdit = true;
             
              localStorage.setItem('users', JSON.stringify(this.users))
            }
            else if (dragged.textContent === 'CanDelete') {
              item.canDelete = true;
              
              localStorage.setItem('users', JSON.stringify(this.users))
            }
          }
          
          else if (e.target.id === userAvailable) {
            if (dragged.textContent === 'CanAdd') {
              item.canAdd = false;
              localStorage.setItem('users', JSON.stringify(this.users))
            }
            else if (dragged.textContent === 'CanEdit') {
              item.canEdit = false;
              localStorage.setItem('users', JSON.stringify(this.users))
            }
            else if (dragged.textContent === 'CanDelete') {
              item.canDelete = false;
              localStorage.setItem('users', JSON.stringify(this.users))
            }
          }
        })

      })
    })
    localStorage.setItem("users", JSON.stringify(this.users));
    this.renderUser(this.users);

  }

}
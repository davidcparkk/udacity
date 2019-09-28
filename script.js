var API_URL = 'https://private-7e7394-udacityfrontendtest.apiary-mock.com';
var API_PATH_SIGNUP = '/signup';
var API_PATH_SIGNIN = '/signin';

let el1 = document.getElementById("sign-up");
if(el1) {
  el1.addEventListener('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    validateForm(this);
  }, false );
};
let el2 = document.getElementById("sign-in");
if(el2){
  el2.addEventListener('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    validateForm(this);
  }, false );
}

function post(url, data) {
  return new Promise(function(resolve,reject){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300){
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: JSON.parse(xhr.response)
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: JSON.parse(xhr.response)
      });
    };
    xhr.send(JSON.stringify(data));
  });
}

function submitForm(path) {
  loading();
  post(API_URL + path, {
    username: document.querySelector('#username').value,
    password: document.querySelector('#password').value
  }, function(res) {
    console.log(res);
  }).then(function(datums){
    console.log(datums);
    removeLoading();
    clearErrors();
    const message = document.querySelector('#message');
    message.classList.add('messageDisplay');
    message.innerText = `${datums.statusText.message}`;
  }).catch(function(err){
    console.log(err);
    removeLoading();
    clearErrors();
    const message = document.querySelector('#message');
    message.classList.add('messageDisplay');
    message.innerText = `${err.statusText.message}`;;
  });
}

function validateForm(action){
  clearErrors();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;

  if(username === ""){
    const error = document.createElement('span');
    error.classList.add('error');
    var node = document.createTextNode('Username must be filled out.');
    error.appendChild(node);
    const element = document.getElementById('username');
    element.parentNode.insertBefore(error, element.nextSibling);
  }

  if(email === ""){
    const error = document.createElement('span');
    error.classList.add('error');
    var node = document.createTextNode('Email must be filled out.');
    error.appendChild(node);
    const element = document.getElementById('email');
    element.parentNode.insertBefore(error, element.nextSibling);
  }

  if(password === "" || password.length < 6){
    const error = document.createElement('span');
    error.classList.add('error');
    var node = document.createTextNode('Password must be filled out and be at least 6 characters long.');
    error.appendChild(node);
    const element = document.getElementById('password');
    element.parentNode.insertBefore(error, element.nextSibling);
  }
  
  if(password !== "" && password.length >=6 && username !== "" && email !== ""){
    if(action.id === "sign-up"){
      submitForm(API_PATH_SIGNUP);
    } else if (action.id === "sign-in"){
      submitForm(API_PATH_SIGNIN);
    }
  } else {
    return false;
  }
}

function loading(){
  document.getElementById("content").style.visibility = "hidden";
  document.getElementById("loading").style.display = "block";
}

function removeLoading(){
  document.getElementById("content").style.display = "flex";
  document.getElementById("content").style.visibility = "visible";
  document.getElementById("loading").style.display = "none";
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(e => e.parentNode.removeChild(e));

}
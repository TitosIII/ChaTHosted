import {Modal} from "bootstrap"

let socket = io();
let userName;
let users = [];
let DisUsers = [];
let userWrt = [];

let modal = new Modal(document.getElementById("userMod"));
let userTxt = document.getElementById("user");
let userErr = document.getElementById("invUser");
let btnModal = document.getElementById("btnModal");

let boxUsers = document.getElementById("uList");
let boxDisUsers = document.getElementById("uDisList")

let boxMsg = document.getElementById("messages");
let adv = document.getElementById("adv");
let msgTxt = document.getElementById("txtMsg");
let msgErr = document.getElementById("invMsg");
let btnMsg = document.getElementById("btnMsg");


modal.show();

///////////////////////EventListeners

userTxt.addEventListener("keyup",(evt)=>{
  if(evt.key === "Enter"){
    btnModal.click();
  }
});

btnModal.addEventListener("click",()=>{
  if(validate(userTxt, userErr, true)){
    userName = userTxt.value;
    socket.emit("userConnected", userName);
    modal.hide();
  }
});

btnMsg.addEventListener("click", ()=>{
  if(validate(msgTxt, msgErr, false)){
    socket.emit("newMessage", msgTxt.value);
    msgTxt.value = "";
  }
});

msgTxt.addEventListener("keyup", (evt)=>{
  if(msgTxt.value == ""){
    socket.emit("userNotWritting");
  }else{
    socket.emit("userWritting");
  }
  if(evt.key === "Enter"){
    btnMsg.click();
  }
})

/////////////////Methods

function validate(inp, invtxt, flag){
  var invchar = "@{}$%#=/&|<>`?¿¡'!";
  inp.className = "form-control";
  invtxt.innerHTML = "";

  if(inp.value == ""){
    inp.className = "form-control is-invalid";
    invtxt.innerHTML = "Debe ingresar texto.";
    return false;
  }

  for(var i = 0; i < inp.value.length ; i++){
    if (invchar.indexOf(inp.value.charAt(i)) > -1){
      inp.className = "form-control is-invalid";
      invtxt.innerHTML = "No se permite el uso de caracteres especiales.";
      return false;
    }
  }

  if(flag){
    if(users.indexOf(inp.value) > -1){
      inp.className = "form-control is-invalid";
      invtxt.innerHTML = "Ese nombre ya está en uso.";
      return false;
    }
  }

  return true;
}

function updateUsers(){
  var txtHtml = "<ul>";
  users.forEach((User)=>{
    txtHtml += `<li>${User}`
  })
  txtHtml += "</ul>"
  boxUsers.innerHTML = txtHtml;
}

function updateDisUsers(){
  var txtHtml = "<ul>";
  DisUsers.forEach((User)=>{
    txtHtml += `<li>${User}`
  })
  txtHtml += "</ul>"
  boxDisUsers.innerHTML = txtHtml;
}

function updateUsersWritting(){
  var advWrt = userWrt.filter((User)=>{
    return User != userName;
  })
  if(advWrt.length === 0){
    adv.innerHTML = "";
  }else{
    adv.innerHTML = `${advWrt} está(n) escribiendo.`
  }
}

//////////////////////////Socket on's

socket.on("userConnected", (userList)=>{
  users = userList;
  updateUsers();
});

socket.on("newMessage", (data)=>{
  if(data.name === userName){
    boxMsg.innerHTML += `<p align="right"><b>${data.name}</b>: ${data.message} <br></p>`;
  }else{
    boxMsg.innerHTML += `<p><b>${data.name}</b>: ${data.message} <br></p>`;
  }
  boxMsg.scrollTop = boxMsg.scrollHeight;
});

socket.on("userWritting",(userWL)=>{
  userWrt = userWL;
  updateUsersWritting();
});

socket.on("userDisconnected",(userD)=>{
  DisUsers.push(userD);
  console.log(userD);
  console.log(DisUsers);
  updateDisUsers();
});

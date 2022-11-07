var form = document.getElementById("form");
var userF = document.getElementById("user");
var btn = document.getElementById("btn");
var txterr = document.getElementById("invUser");

form.addEventListener("submit", (evt)=>{
    var flag = true;
    var invalchar = "@!#$%&/()=?¡'¿<>{}[]+´¨^";
    txterr.innerHTML = ""
    if (userF.value.length === 0){
        flag = false;
        userF.className = "form-control is-invalid";
        txterr.innerHTML = "Debes ingresar un nombre de usuario.";
        evt.preventDefault();
    } 
    for (var i = 0; i < userF.value.length ; i++){
        
        if (invalchar.indexOf(userF.value.charAt(i)) != -1 ){
            flag = false;
            userF.className = "form-control is-invalid";
            txterr.innerHTML = "No se permite el uso de caracteres especiales (@!#$%&/).";
            evt.preventDefault();
            break;
        } 
    }
    return flag;
}, false);
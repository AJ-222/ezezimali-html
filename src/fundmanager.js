var modal = document.getElementById("myModal");
var btns = document.getElementsByClassName("open-modal");
var span = document.getElementsByClassName("close")[0];
const user = ""
const id = ""
const mainRole = ""

for(let i = 0; i < btns.length; i++) {
  btns[i].onclick = function() {
    modal.style.display = "block";
  }
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function getInfo(){
  fetch('https://mango-pond-0eb19fd03.5.azurestaticapps.net/.auth/me')
  .then(response => response.json())
  .then(data => {
    user = data.clientPrincipal.userDetails;
    id = data.clientPrincipal.userID;
    userRoles = data.clientPrincipal.userRoles;
    console.log(user);
    console.log(id);
    console.log(userRoles);
    document.getElementById("email").innerHTML = "Welcome " + user;
    const length = userRoles.length;
    const mainRole = userRoles[length - 1];
    document.getElementById("role").innerHTML = "Role: " + userRoles[0];
  })
  .catch(error => console.error('Error:', error));
}
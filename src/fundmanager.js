var modal = document.getElementById("myModal");
var btns = document.getElementsByClassName("open-modal");
var span = document.getElementsByClassName("close")[0];

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
    const user = data.clientPrincipal.userDetails;
    const id = data.clientPrincipal.userID;
    const userRoles = data.clientPrincipal.userRoles;
    console.log(user);
    console.log(id);
    console.log(userRoles);
  })
  .catch(error => console.error('Error:', error));
}
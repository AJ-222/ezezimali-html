var modal = document.getElementById("myModal");
var btns = document.getElementsByClassName("open-modal");
var span = document.getElementsByClassName("close")[0];
let user = ""
let id = ""
let mainRole = ""

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
    id = data.clientPrincipal.userId;
    userRoles = data.clientPrincipal.userRoles;
    console.log(user);
    console.log(id);
    console.log(userRoles);
    document.getElementById("email").innerHTML = "Welcome " + user;

    if (userRoles.includes("admin")){
      mainRole = "Admin";
    }
    else if (userRoles.includes("fundmanager")){
      mainRole = "Fund Manager";
    }
    else{
      mainRole = "Applicant";
    }
    document.getElementById("role").innerHTML = "Role: " + mainRole;
    if (mainRole == "Admin"){
      const adminButton = document.createElement("button");
      adminButton.innerHTML = "Admin";
      adminButton.onclick = function() {
        window.location.href = "admin.html";
      };
      document.getElementById("account").appendChild(adminButton);
    }
  })
  .catch(error => console.error('Error:', error));
}

async function getFunds(){
  {
    fetch('https://mango-pond-0eb19fd03.5.azurestaticapps.net/api/funds')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  }
}
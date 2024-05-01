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

    // Get a reference to the button and its parent anchor tag
    var applyBtn = document.getElementById("applyBtn");
    var applyBtnParent = applyBtn.parentElement;

    if (userRoles.includes("admin")){
      mainRole = "Admin";
    }
    else if (userRoles.includes("fundmanager")){
      mainRole = "Fund Manager";
      // If the user is a fund manager, change the button text and link
      applyBtn.innerHTML = "Go to fund manager page";
      applyBtnParent.href = "/fundmanager"; // Change this to the URL of your fund manager page
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

//creating the pop up to create a new opportunity
var adModal = document.getElementById("adModal");
var adButton = document.getElementById("adButton");
var closeAdModal = document.getElementsByClassName("close")[1]; // Assuming this is the second close button

adButton.onclick = function() {
    adModal.style.display = "block";
}

closeAdModal.onclick = function() {
    adModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal || event.target == adModal) {
        modal.style.display = "none";
        adModal.style.display = "none";
    }
}
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
(async function() {
    const { data } = await( await fetch(`https://mango-pond-0eb19fd03.5.azurestaticapps.net/.auth/me`)).json();
    console.log(data);
}());
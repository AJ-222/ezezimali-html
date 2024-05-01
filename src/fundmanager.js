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
app.get('/login', 
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);
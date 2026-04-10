// Navigation
function goSignup(){
  window.location.href = "signup.html";
}

function goLogin(){
  window.location.href = "login.html";
}


// SIGNUP
async function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("role").value;

  const res = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });

  alert(await res.text());
}


// LOGIN
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if(!data.token){
    alert("Login failed");
    return;
  }

  // Save token
  localStorage.setItem("token", data.token);

  // Decode token
  const payload = JSON.parse(atob(data.token.split('.')[1]));
  localStorage.setItem("role", payload.role);

  window.location.href = "profile.html";
}


// PROFILE PAGE LOGIC
if(window.location.pathname.includes("profile.html")){

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔒 PROTECT PAGE
  if(!token){
    alert("Please login first");
    window.location.href = "login.html";
  }

  document.getElementById("token").innerText = "Token: " + token;
  document.getElementById("role").innerText = "Role: " + role;

  // 👇 HIDE ADMIN SECTION
  if(role !== "admin"){
    document.getElementById("adminSection").style.display = "none";
  }
}


// LOGOUT
function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  alert("Logged out successfully");

  window.location.href = "index.html";
}
const loginCard = document.getElementById("login-card");
const signupCard = document.getElementById("signup-card");

loginCard.addEventListener('click',()=>{
    window.location.href = 'auth/login';
})

signupCard.addEventListener('click',()=>{
    window.location.href = 'auth/signup';
})
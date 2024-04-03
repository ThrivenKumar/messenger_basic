const createUser = document.getElementById("create-user");
const username = document.getElementById("username");
const password = document.getElementById("password");
const inputError = document.getElementById("login-input-error");

createUser.addEventListener("click", ()=>{
    const name = username.value;
    const pwd = password.value;
    if(name && pwd){
        authenticateUser(name,pwd);
    }
    else{
        inputError.innerText="Enter all the details";
    }
})

const authenticateUser = async(name, pwd)=>{
    const response = await fetch("http://localhost:5000/api/auth/login",{
        method: 'POST',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body:JSON.stringify({
            username:name,
            pwd:pwd
        }),
    })
    const data = await response.json()
    console.log(data);
    if(response.status === 200){
        localStorage.setItem("username", username);
        window.location.href="/chat";
    }
    else{
        inputError.innerText="Internal Server Error";
    }    
}
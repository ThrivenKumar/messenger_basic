const createUser = document.getElementById("create-user");

const username = document.getElementById("username");
const password = document.getElementById("password");
const reEnterPassword = document.getElementById('re-enter-password');
const gender = document.getElementById("gender");
const inputError = document.getElementById("signup-input-error");

createUser.addEventListener("click", ()=>{
    const name = username.value;
    const pwd = password.value;
    const repwd = reEnterPassword.value;
    const genderValue = gender.value;
    if(name && pwd && repwd && genderValue){
        if(pwd !== repwd){
            inputError.innerText="Passwords do not match";
            return
        }
        signupUser(name, pwd, genderValue);
    }
    else{
        inputError.innerText="Enter all the details";
    }
})

const signupUser = async (name, pwd, genderValue)=>{
    const response = await fetch("http://localhost:5000/api/auth/signup",{
        method: 'POST',
        headers:{
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            username: name,
            pwd: pwd,
            gender: genderValue
        }),
    })
    const data = await response.json()
    console.log(data);
    if(response.status === 201){
        localStorage.setItem("username", name);
        window.location.href="/chat";
    }
    else if(response.status === 400){
        inputError.innerText=data.message;
    }
    else{
        inputError.innerText=data.message;
    }     
}
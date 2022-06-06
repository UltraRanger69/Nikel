const mymodal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();
//LOGAR NO SISTEMA

document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;
    const session = document.getElementById("exampleCheck1").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Oops! Verifique o usuario ou a senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("Oops! Verifique o usuario ou senha.")
        }

        saveSession(email, session);

    window.location.href = "home.html";

    }

});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("exampleInputEmail2").value;
    const password = document.getElementById("exampleInputPassword2").value;

    if(email.length < 5) {
        alert("Preencha o campo com um email valido");
        return;
    }

    if(password.length < 4) {
    alert("Preencha a senha com no minimo 4 digitos");
    return;
}

saveAccount({
    login: email,
    password: password,
    transactions: []
});

myModal.hide();

alert("conta criada com sucesso")
});

function checkLogged() {
if(session) {
    sessionStorage.setItem("logged", session)
    logged = session
}
if(logged) {
    saveSession(logged, session);

    window.location.href = "home.html";
}
}

function saveAccount(data) {
localStorage.setItem(data.email, JSON.stringify(data))
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data)
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account)
    }

    return "";
}
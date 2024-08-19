const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpass = document.getElementById("confirmpass");
var data = [name, email, password, confirmpass];

const errorMessage = document.getElementById("reg-error");

let regBut = function () {
    if (validation()) {
        saveUser();
    }
}

let validation = function () {
    errorMessage.style.height = "0";
    errorMessage.style.marginBottom = "0";
    errorMessage.style.opacity = 0;

    empt = []
    ex = true;
    for (const el of data) {
        el.style.background = "white";

        if (el.value === "") {
            el.style.background = "#f7dae2";
            ex = false;
        }
    }

    if (!ex) {
        showErrorPlate();
        errorMessage.innerHTML = "Введены не все значения";
        return false
    }

    if (email.value.search("@") === -1) {
        showErrorPlate();
        email.style.background = "#f7dae2";
        errorMessage.innerHTML = "Почта введена неверно\nПример: example@gmail.com";
        return false
    }

    if (password.value.length < 8) {
        showErrorPlate();
        password.style.background = "#f7dae2";
        errorMessage.innerHTML = "Длина пароля меньше 8 символов";
        return false
    }

    if (password.value !== confirmpass.value) {
        showErrorPlate();
        password.style.background = "#f7dae2";
        confirmpass.style.background = "#f7dae2";
        errorMessage.innerHTML = "Пароли не совпадают";
        return false
    }

    return true;

}

let showErrorPlate = function () {
    const error = document.querySelector('#error');
    const errorMessage = document.querySelector('.error-message');
    error.style.height = "77px";
    error.style.marginBottom = "12px";
    errorMessage.style.height = "fit-content"
    errorMessage.style.transition = "3s"
    errorMessage.style.opacity = 1;
}

let saveUser = function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpass = document.getElementById("confirmpass").value;

    const data = {
        name,
        email,
        password
    }

    const jsonData = JSON.stringify(data);
    fetch('/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).then(response => {
        if (!response.ok) {
            document.getElementById("email").style.background = "#f7dae2";
            errorMessage.innerHTML = "Пользователь с такой почтой уже зарегистрирован";
            showErrorPlate();
        }
        else {
            errorMessage.style.background = "#DD0D4B";
            errorMessage.innerHTML = "Успешная регистрация";
            showErrorPlate();
            setTimeout(function(){
                window.location.href = '/login';
            }, 2 * 1000);
        }
        return response.json();
    })
}
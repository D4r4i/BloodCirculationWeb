const email = document.getElementById('email');
const password = document.getElementById('password');
const errorMessage = document.getElementById("reg-error");

let logBut = function () {
    if (validation()) {
        logUser();
    }
}

let validation = function () {
    email.style.background = "white";
    password.style.background = "white";
    errorMessage.style.height = "0";
    errorMessage.style.marginBottom = "0";
    errorMessage.style.opacity = 0;

    ex = true;
    if (email.value === "") {
        showErrorPlate();
        email.style.background = "#f7dae2"
        errorMessage.innerHTML = "Введены не все значения";
        ex = false;
    }
    if (password.value === "") {
        showErrorPlate();
        password.style.background = "#f7dae2"
        errorMessage.innerHTML = "Введены не все значения";
        ex = false;
    }

    if (!ex) {
        return false;
    }

    if (email.value.search("@") === -1) {
        showErrorPlate();
        email.style.background = "#f7dae2";
        errorMessage.innerHTML = "Почта введена неверно\nПример: example@gmail.com";
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

function logUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    $.ajax({
        url: '/login',
        type: 'POST',
        data: { username: email, password: password },
        success: function(response) {
            // Если авторизация успешна
            errorMessage.innerHTML = "Успешная авторизация";
            showErrorPlate();
            setTimeout(function(){
                window.location.href = '/';
            }, 2 * 1000);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Если авторизация неудачна
            errorMessage.innerHTML = "Неверный электронный адрес или пароль";
            showErrorPlate();
        }
    });
}

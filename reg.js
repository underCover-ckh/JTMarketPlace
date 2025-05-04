let nama = document.getElementById('name')
let pass = document.getElementById('pass')
let email = document.getElementById('email')
let btn = document.getElementById('button')

function btn(){
    localStorage.setItem('username', nama.value);
    localStorage.setItem('password', pass.value);
    alert("Data anda sudah tersimpan, Silahkan Masuk ke Home");

    window.location.href = "login-landing.html";
}
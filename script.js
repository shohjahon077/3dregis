document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Registratsiya shakliga o'tish
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        card.classList.add('is-flipped');
    });

    // Kirish shakliga o'tish
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        card.classList.remove('is-flipped');
    });

    // Shakllarni jo'natish (Amalda bularni backendga yuborish kerak)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Kirish ma\'lumotlari jo\'natildi! (Amalda backendga yuboriladi)');
        // Bu yerda AJAX yoki Fetch API yordamida ma'lumotlarni serverga yuborishingiz kerak
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Registratsiya ma\'lumotlari jo\'natildi! (Amalda backendga yuboriladi)');
        // Bu yerda AJAX yoki Fetch API yordamida ma'lumotlarni serverga yuborishingiz kerak
    });
});

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarSupportedContent');
const body = document.body;

navbarToggler.addEventListener('click', function () {
    if (navbarCollapse.classList.contains('show')) {
        body.style.paddingTop = '70px'; // Ajuste para a altura da sua navbar
    } else {
        body.style.paddingTop = '0'; // Remove o padding-top quando o menu estiver fechado
    }
});
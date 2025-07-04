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

window.addEventListener('load', () => {
    const footer = document.getElementById('footer');
    if (document.body.scrollHeight <= window.innerHeight) {
        footer.classList.add('position-fixed', 'bottom-0');
    } else {
        footer.classList.remove('position-fixed', 'bottom-0');
    }
});
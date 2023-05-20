import '../styles/app.css'
const preview = document.querySelector('#preview');
const header = document.querySelector('header');
const ul = document.querySelector('ul');
preview.style.top = header.offsetHeight-1;
preview.style.height = `calc(90vh - ${header.offsetHeight}px)`;
ul.addEventListener('click', event => {
    event.target.closest('li').lastChild.classList.toggle('service-active');
})
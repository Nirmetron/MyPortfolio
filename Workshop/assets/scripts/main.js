import '../styles/app.css'
const preview = document.querySelector('#preview');
const header = document.querySelector('header');
const ul = document.querySelector('ul');
const openButtons = document.getElementsByClassName('open-buttons')
const actionsPopUp = document.querySelector('#actions-list');
const headerOffset = header.offsetHeight;
preview.style.marginTop = headerOffset-10;
preview.style.height = `calc(88vh - ${headerOffset}px)`;

actionsPopUp.style.marginTop = headerOffset;
actionsPopUp.style.height = `calc(100vh - ${headerOffset}px) `

actionsPopUp.addEventListener('click', ()=>{alert('asd')})

ul.addEventListener('click', event => {
    event.target.closest('li').lastChild.classList.toggle('service-active');
})

for (const button of openButtons){
button.addEventListener('click', () => {
    actionsPopUp.classList.toggle('opened')
})
}
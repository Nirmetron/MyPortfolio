const btnAppointment = document.getElementById('btn-appointment');
const gridInputs = document.getElementsByClassName('grid-inputs')[0];
const car = document.getElementById('car')
const carElements = car.children;
console.dir(btnAppointment)
btnAppointment.addEventListener('click', showRegistration);

function showRegistration() {
    gridInputs.classList.toggle('visible')
    car.classList.toggle('active')
    for (const child of carElements){
        child.classList.toggle('active')
    }
}


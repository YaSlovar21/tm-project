import './service.css'

const formChoice = document.forms.formChoice;

const plastTable = document.querySelector('.service-grid__plast-table');
const sealsTable = document.querySelector('.service-grid__seals-table');

function changeView(type) {

}

formChoice.addEventListener("change" , ()=>{
  if (formChoice.elements.radio.value === 'plast') {
    plastTable.style.display = 'block';
    sealsTable.style.display = 'none';
  } else {
    plastTable.style.display = 'none';
    sealsTable.style.display = 'block';
  }
});
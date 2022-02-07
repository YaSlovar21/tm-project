import './about.css';

const imgToChange = document.querySelector('.listimage__image');

const bullets = Array.from(document.querySelectorAll('.listimage__list-item'))


function changeSrc(imageElement, newSrc) {
  unsetListeners(bullets);
  imageElement.style.opacity = '0';
  setTimeout(()=>{
    imageElement.style.opacity = '1';

  }, 700)
  setTimeout(()=> {
    imageElement.src = newSrc;
  }, 600);
  setTimeout(()=> {
    setEventListeners(bullets)
  }, 700)
}

let newSrc = '';

function handleMousOvered(evt) {
  if (!evt.target.classList.contains('listimage__list-item_active')) {
    changeSrc(imgToChange, evt.target.dataset.img);
    evt.target.classList.add('listimage__list-item_active');
  }
}

function setEventListeners(bullets) {
  bullets.forEach((item)=> {
    item.addEventListener('mouseover',  handleMousOvered);
  })
}
function unsetListeners(bullets) {
  bullets.forEach((item)=> {
    if (item.classList.contains('listimage__list-item_active')) {
      item.classList.remove('listimage__list-item_active');
    }
    item.removeEventListener('mouseover', handleMousOvered);
  })
}

setEventListeners(bullets);

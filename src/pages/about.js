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
  }, 3000)
}

function handleMousOvered(imgToChange, newSrc) {
  changeSrc(imgToChange, newSrc);
}

function setEventListeners(bullets) {
  bullets.forEach((item)=> {
    item.addEventListener('mouseover', handleMousOvered(imgToChange, item.dataset.img) );
  })
}
function unsetListeners(bullets) {
  bullets.forEach((item)=> {
    item.removeEventListener('mouseover')//, handleMousOvered(imgToChange, item.dataset.img));
  })
}
/*
function unsetListeners(bullets) {
  bullets.forEach((item)=> {
    item.removeEventListener('mouseover', () => {
      changeSrc(imgToChange, item.dataset.img);
      //imgToChange.src = item.dataset.img;
    });
  })
}
*/
setEventListeners(bullets);

import './about.css';

const imgToChange = document.querySelector('.listimage__image');

const bullets = Array.from(document.querySelectorAll('.listimage__list-item'))



function changeSrc(imageElement, newSrc) {
  imageElement.style.opacity = '0.1';
  setTimeout(()=>{
    imageElement.style.opacity = '1';
  }, 1200)
  setTimeout(()=> {
    imageElement.src = newSrc;
  }, 700)
}

bullets.forEach((item)=> {
  item.addEventListener('mouseover', () => {
    changeSrc(imgToChange, item.dataset.img);
    //imgToChange.src = item.dataset.img;
  })
})
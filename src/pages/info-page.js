const openRaschetButton = document.querySelector('.info__sale-link');
const raschetSection = document.querySelector('.inforaschet');

openRaschetButton.addEventListener('click', ()=>{
  if (!raschetSection.classList.contains('inforaschet_active')) {
    openRaschetButton.scrollIntoView({
      behavior: 'smooth'
    });
  }
  raschetSection.classList.toggle('inforaschet_active');
  raschetSection.classList.toggle('animate__animated');
  raschetSection.classList.toggle('animate__slow');
  raschetSection.classList.toggle('animate__fadeIn');
});


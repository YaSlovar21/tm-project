const questions = Array.from(
  document
    .querySelectorAll('.frequently__question')
);

const freqs = Array.from(
  document
    .querySelectorAll('.frequently__item')
);


function setFreqActive() {
  const fitstElem = questions[0].closest('.frequently__item');
  if (!fitstElem.classList.contains('frequently__item_active')) {
    fitstElem.classList.add('frequently__item_active')
  }
}

function clearActives() {
  freqs.map(i => i.classList.remove('frequently__item_active'))
}

setFreqActive();

questions.forEach(element => {
  element.addEventListener('click', function(evt) {
    const questionElem = evt.target.closest('.frequently__item');
    const answerElem = questionElem.querySelector('.frequently__answer');
    clearActives();
    questionElem.classList.toggle('frequently__item_active');
    console.log(evt.target.closest('.frequently__item'));
    answerElem.classList.toggle('animate__animated');
    answerElem.classList.toggle('animate__slow');
    answerElem.classList.toggle('animate__fadeIn');

  })
});

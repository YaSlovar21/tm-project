import './blog-spec-page.css';

const truncatedSection = document.querySelector('.truncated-section');
const truncatedButton = document.querySelector('.truncated-section__more-button');
if (truncatedButton) {
    truncatedButton.addEventListener('click', () => {
    truncatedSection.classList.add('truncated-section_opened');
    truncatedButton.style.display = 'none';
    truncatedSection.scrollIntoView({
      behavior: 'smooth'
    });
  })
}
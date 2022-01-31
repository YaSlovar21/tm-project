export function renderLoading(boolOnLoading, buttonElement, textDefault, textOnLoading) {
    if (boolOnLoading) {
      buttonElement.textContent = textOnLoading;
    } else {
      buttonElement.textContent = textDefault;
    }
}

/* Фильтры статей в блоге */

// нигде не используется
export function isIntersection(arrA, arrB) {
  return arrA.some(item => arrB.includes(item));
}

export function isFullInclude(arrA, arrB) {
  console.log(arrA, arrB)
  return !arrA.some(item => !arrB.includes(item))
}

export function articlesMapper(tags, articles) {
  return articles.filter(item => isFullInclude(tags, item.tags));
}

export function useWindowSize() {
  let windowSize = window.innerWidth;

  function handleWindowResize() {
    setTimeout(setWindowWidth(window.innerWidth), 1500);

  }

  function setWindowWidth(updatedWidth) {
    windowSize = updatedWidth;
    //console.log(windowSize);
  }

  window.addEventListener('resize', handleWindowResize)

  return windowSize;
}
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


export function useWindowSizeTest() {
  let windowSize = window.innerWidth;

  function handleWindowResize() {
    setWindowWidth(window.innerWidth)
    //console.log(windowSize);
  }

  function setWindowWidth(updatedWidth) {
    windowSize = updatedWidth;
  }

  window.addEventListener('resize', handleWindowResize)

  return windowSize;
}
/*

// колбэк, который нужно выполнить после того
// как изображение загрузится
export function imageLoadCallback(evt) {
  // после загрузки добавим элемент изображения в DOM
  document.body.append(evt.target);
}

// Функция для создания изображения
function loadImage(imageUrl, loadCallback) {
  const img = document.createElement('img');
  img.src = imageUrl;

  // Функция, которая записана в onload
  // будет вызвана после загрузки изображения
  img.onload = loadCallback;
}

// Теперь картинка появится в разметке только после загрузки
loadImage(
  'https://yastatic.net/q/logoaas/v1/Практикум.svg',
  imageLoadCallback
);*/
export function renderLoading(boolOnLoading, buttonElement, textDefault, textOnLoading) {
    if (boolOnLoading) {
      buttonElement.textContent = textOnLoading;
    } else {
      buttonElement.textContent = textDefault;
    }
}

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
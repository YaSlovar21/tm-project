function articleDateMapper(newsArr) {
    return newsArr.map((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      return {
        ...item,
        formattedDate: `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}`
      }
    })
  }
  
function dictMapper(dictData) {
    return dictData.map(item => ({
        ...item,
        sequence: JSON.parse(item.sequence),
        dict: JSON.parse(item.dict)
    }))
}

function galleryMapper(galleryArr) {
    return galleryArr.map(item => ({
        ...item,
        tags: JSON.parse(item.tags),
        consumersIds: JSON.parse(item.consumersIds)
    }))
}

function faqsMapper(faqsArr) {
  return faqsArr.map(item => ({
    ...item,
    tags: JSON.parse(item.tags),
    relevanceIds: JSON.parse(item.relevanceIds),
    consumersIds: JSON.parse(item.consumersIds),
    imagesFromGalleryIds: JSON.parse(item.imagesFromGalleryIds)
  }))
}

function genSitemapObj(fileName, priority, changefreq) {
  return {
    path: `/${fileName}`,
    lastmod: (new Date()).toString(),
    priority,
    changefreq: changefreq
  }
}

module.exports = {
    articleDateMapper,
    dictMapper,
    galleryMapper,
    faqsMapper,
    genSitemapObj
};
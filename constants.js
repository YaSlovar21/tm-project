const ROUTES = {
    catalog: '/catalog/',
    calc: '/equipment-selection/',
    productuion: '/production.html',
    blog: '/blog-proizvodstva/',

    pto: '/plastinchatye-teploobmenniki/',
    ptoRaschets: '/plastinchatye-teploobmenniki/raschets/',
    ptoOtopAgr: '/plastinchatye-teploobmenniki/otoplenie/',
    ptoGvsAgr: '/plastinchatye-teploobmenniki/goryachee-vodosnabzhenie-gvs/',
  
    ptoFood: '/pishchevye-teploobmenniki.html',

    btp: '/blochnye-teplovye-punkty/',
    pou: '/pasterizatsionno-okhladitelnye-ustanovki.html',
    about: '/about/',
    service: '/service.html',
    contacts: '/contacts.html',
    //vacs: '/about/vakansii/',
};

const ROUTES_SPEC = {

  ptoNewGofr: '/plastinchatye-teploobmenniki/novaya-rossijskaya-plastina-teploobmennika.html',
  ptoTeploizol: '/plastinchatye-teploobmenniki/teploizolyaciya.html',
  ptoPayan: '/plastinchatye-teploobmenniki/plastinchatye-payanye-teploobmenniki/',
}

const techNames = {

}

const featuresForCats = {

}

const standartClasses = {
  popupImageClass: 'popup-image-item',
  ctaButtonClass: 'cta-button',
}

module.exports = {
  ROUTES_SITEMAP: ROUTES,
  ROUTES: {...ROUTES, ...ROUTES_SPEC},
  techNames,
  standartClasses,
  featuresForCats
}
const { ROUTES_SITEMAP } = require("./constants");
const { dataForSitemap } = require("./raschets");
const { dataSpecPagesForSitemap } = require("./specPages");
const { dataTisForSitemap } = require("./tis");

const dateNow = (new Date()).toString();

module.exports.paths = [
    {
      path: '/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
    /* разделы тянем из ROUTES */
    /* спецСтраницы тянем из модуля */
    
    /* статьи - конкатим в вебпаке, полученные с сервера */
    /* --- теплообменники тянем из модуля --- */
    /* документы */
    {
      path: '/docu/termoblok_catalog.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
    },
    {
      path: '/docu/Termoblok_Sout.pdf',
      lastmod: dateNow,
      priority: 0.5,
      changefreq: 'monthly'
    },
    {
      path: '/docu/Katalozhnii_list_BTP_Termoblok.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
    },
    {
      path: '/docu/btp-certificate.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
    },
    {
      path: '/docu/Oprosnii_list_podbora_teplovogo_punkta.doc',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
    },
    {
      path: '/docu/Oprosnii_list_podbora_teplovogo_punkta.doc',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
    },
    {
      path: '/docu/Termoblok_reference_teploobmenniki.pdf',
      lastmod: dateNow,
      priority: 0.7,
      changefreq: 'monthly'
    },
    /* ГЕНЕРАЦИЯ MACE */
    {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-102-кВт-вентиляция.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-122-кВт-вентиляция.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-1289-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-130-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-137-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-1695-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-1695-кВт-узел-ввода.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-1752-кВт-узел-ввода.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-20-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-207-кВт-вентиляция.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-2352-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-2352-кВт-узел-ввода.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-275-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-276-кВт-узел-ввода.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-337-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-436-кВт-узел-ввода.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-462-кВт-гвс-горячее-водоснабжение.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-520-кВт-гвс-горячее-водоснабжение.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-61-кВт-на-отопление.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     {
      path: '/blochnye-teplovye-punkty/Блочный-тепловой-пункт-788-кВт-узел-ввода.pdf',
      lastmod: dateNow,
      priority: 0.6,
      changefreq: 'monthly'
      },
     
].concat( dataForSitemap.map((item)=>{
  return {
    //в ${item} содержится подкатегория гвс или отопление или спец расчёт(пищевой на данный момент): подкатегория/слаг названия расчёта.html
    path: `/plastinchatye-teploobmenniki/${item}.html`,
    lastmod: dateNow,
    priority: 0.7,
    changefreq: 'monthly'
  }
})).concat(dataTisForSitemap, dataSpecPagesForSitemap).concat(Object.keys(ROUTES_SITEMAP).map(i => ({
  path: ROUTES_SITEMAP[i],
  lastmod: dateNow,
  priority: 0.9,
  changefreq: 'monthly'
})));
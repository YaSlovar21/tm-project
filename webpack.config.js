const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HttpsProxyAgent = require('https-proxy-agent');
const fetch1 = require('node-fetch');

const canonicalURL = 'https://www.termoblok.ru'

const { paths } = require('./sitemap');


const { rawData, razbegPoMoshnosti } = require('./raschets');
const { staticRaschet } = require('./raschetStatic');

const { btpexamples } = require('./btpexamples');
const { tis, foodtis } = require('./tis');
const { specPages, specPagesTypes } = require('./specPages');
const { cycleData, blogThemesDict } = require('./consts');
const { ROUTES, phProcs } = require('./constants');



function generateRaschetHtmlPlugins(isDevServer) {
    return rawData.map(ptoData => {
      return new HtmlWebpackPlugin({
        title: ptoData.title ? ptoData.title:  `Какой то расчёт`,
        template: "./src/abstract-raschet-page.html", // шаблон
        filename: `plastinchatye-teploobmenniki/${ptoData.naznach === 'гвс' ? 'goryachee-vodosnabzhenie-gvs' : ptoData.naznach === 'отопление' ? 'otoplenie' : 'raschets'}/${ptoData.path}.html`,
        templateParameters: {...ptoData, isDevServer},
        razbegPoMoshnosti,
        chunks: ["blogSpecPage", "all", "map"],
      })
    })
};

function generateTisHtmlPlugins(isDevServer) {
  return tis.concat(foodtis).map(ptoData => {
    return new HtmlWebpackPlugin({
      ...ptoData,
      templateParameters: {
        ...ptoData.templateParameters,
        isDevServer
      }
    })
  })
}

function generateSpecPagesHtmlPlugins(isDevServer) {
  return specPages.map(articleData => {
    return new HtmlWebpackPlugin({
      ...articleData, 
      templateParameters: {
        isDevServer,
        ...articleData.templateParameters,
        specPages, 
        upsubtitle: specPagesTypes[articleData.type]
      }
    })
  })
}

const dateNow = (new Date()).toString();
let generatedPaths = [];

function generateBlogPagesHtmlPlugins(articles, isDevServer) {
  return articles.map(article => {
    generatedPaths.push(
      {
        path: `${ROUTES.blog}${article.staticPage}`,
        lastmod: dateNow,
        priority: 0.7,
        changefreq: 'monthly'
      }
    )
    return new HtmlWebpackPlugin({
      templateParameters: {
        isDevServer,
        canonicalURL: canonicalURL,
        upsubtitle: article.type.includes('news') ? blogThemesDict['news'] : blogThemesDict[article.type[0]],
        isGkh: article.type.includes('gkh'),
        articleFile: `${article.articleInnerFile}.html`,
        customPoster: article.type.includes('news') ? `${article.articleInnerFile}.png` : '',
      },
      title: article.seoTitle,
      heading: article.h1,
      meta: {
        keywords: article.seoKeywords,
        description: article.seoDesc,
      },
      template: "./src/blog-page-abstract.html",
      filename: `blog-proizvodstva/${article.staticPage}`,
      chunks: ["blogPage", "all", "map", "popupImage"],
    })
  })
}

function generateNewsPagesToBlogHtmlPlugins(articles, isDevServer) {
  return articles.filter(a=> a.isStaticPage).map(article => {
    generatedPaths.push(
      {
        path: `${ROUTES.blog}${article.isStaticPage}`,
        lastmod: dateNow,
        priority: 0.7,
        changefreq: 'monthly'
      }
    )
    return new HtmlWebpackPlugin({
      templateParameters: {
        isDevServer,
        canonicalURL: canonicalURL,
        upsubtitle: 'новости',
        isGkh: true,
        articleFile: `${article.textId}.html`
      },
      title: article.title,
      heading: article.title,
      meta: {
        keywords: article.title,
        description: article.intro,
      },
      template: "./src/blog-page-abstract.html",
      filename: `blog-proizvodstva/${article.isStaticPage}`,
      chunks: ["blogPage", "all", "map", "popupImage"],
    })
  })
}


function generateConfig(infoBlogData, newsData, galleryData, isDevServer) {
  const htmlRaschetPlugins = generateRaschetHtmlPlugins(isDevServer);
  const htmlTisPlugins = generateTisHtmlPlugins(isDevServer);
  const htmlArticlesPlugins = generateBlogPagesHtmlPlugins(infoBlogData, isDevServer);
  const htmlNewsToBlog = generateNewsPagesToBlogHtmlPlugins(newsData, isDevServer);
  const htmlSpecPagesPluginst = generateSpecPagesHtmlPlugins(isDevServer);
  console.log(galleryData);

  console.log(infoBlogData.filter(i=> i.type.includes('news')).toSorted((a,b) => b.id - a.id));
  return {
    entry: {
      index: "./src/pages/index.js",
      all: "./src/pages/all.js",
      map: "./src/pages/map.js",
      pto: "./src/pages/pto.js",
      ti: "./src/pages/ti.js",
      catalog: "./src/pages/catalog.js",
      btp: "./src/pages/btp.js",
      ptoFood: "./src/pages/pto-food.js",
      production: "./src/pages/production.js",
      service: "./src/pages/service.js",
      about: "./src/pages/about.js",
      contacts: "./src/pages/contacts.js",
      blogSection: "./src/pages/blog-section.js",
      blogPage: "./src/pages/blog-page.js",
      blogSpecPage: "./src/pages/blog-spec-page.js",
      equipment: "./src/pages/equipment1.js",
      pou: "./src/pages/pou.js",
      vakansii: "./src/pages/vakansii.js",
      /* Компоненты */
      freq: "./src/pages/components/freq.js",
      popupImage: "./src/pages/components/popupImage.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
      assetModuleFilename: "images/[hash][ext]",
      publicPath: '/'
    },
    // добавили режим разработчика
    mode: "development",
    devServer: {
      static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
      open: true, // сайт будет открываться сам при запуске npm run dev
    },
    module: {
      rules: [
        // rules — это массив правил
        // добавим в него объект правил для бабеля
        {
          // регулярное выражение, которое ищет все js файлы
          test: /\.js$/,
          // при обработке этих файлов нужно использовать babel-loader
          use: "babel-loader",
          // исключает папку node_modules, файлы в ней обрабатывать не нужно
          exclude: "/node_modules/",
        },
        {
          test: /\.(mp4)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "videos",
              },
            },
          ],
        },
        {
          test: /favicon\.svg/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "",
              },
            },
          ],
        },

        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webm)$/,
          type: "asset/resource",
          exclude: [
            path.resolve(__dirname, "./src/images/favicon.svg"),
            path.resolve(__dirname, "./src/blog-images/"),
            path.resolve(__dirname, "./src/api-images/"),
          ],
        },
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webm)$/,
          type: "asset/resource",
          include: [
            path.resolve(__dirname, "./src/api-images/"),
          ],
          generator: {
            filename: (pathData) => {         
              return `api-images/[name][ext]`;
          },
       
          }
        },
        /*{
          // Прогрузка картинок в блог в обход лоадера
          // Для сохранения имени, которое указывалось в отдельном файлике (прогруз через fs)
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          use: [
            { loader: "file-loader",
              options: { name: "[name].[ext]",  outputPath: "blog-images",},
            }],
          include: [path.resolve(__dirname, "./src/blog-images/")],
        },*/
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          // загрузка документов в docu/
          test: /\.(doc|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "docu",
              },
            },
          ],
          exclude: [path.resolve(__dirname, "./src/btp-examples/")],
        },
        {
          test: /\.(doc|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "blochnye-teplovye-punkty",
              },
            },
          ],
          include: [path.resolve(__dirname, "./src/btp-examples/")],
        },

        {
          test: /robots\.txt/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },

        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              // добавьте объект options
              options: { importLoaders: 1 },
            },
            // Добавьте postcss-loader 
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          tis,
          foodtis,
          newsData: newsData,
        },
        title:
          "Российский производитель пластин и пластинчатых теплообменников Термоблок",
        meta: {
          keywords: "российское производство теплообменников",
          description: `ООО Термоблок - производитель пластинчатых теплообменников со 100% локализацией 
            изготовление пластин, уплотнений и ряда комплектующих для теплообменников торговой марки Теплохит`,
        },
        template: "./src/index.html", // путь к файлу index.html
        chunks: ["index", "all", "map"],
      }),
      /*---------ПРОДУКЦИЯ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES,
        },
        title: "Производство теплообменого оборудования и установок. Продукция завода.",
        meta: {
          keywords: "производство теплообменного оборудования",
          description: "Отечественный производитель теплообменного оборудования. Изготовление пластинчатых теплообменников, тепловых пунктов.",
        },
        template: "./src/production.html",
        filename: "production.html",
        chunks: ["production", "all"],
        inject: true,
      }),
      /*---------ПЛАСТИНЧАТЫЕ ТЕПЛООБМЕННИКИ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          isDevServer,
        },
        title: "Пластинчатые теплообменники | Аппараты теплообменные разборные",
        meta: {
          keywords: "пластинчатые теплообменники, пластинчатый теплообменник",
          description: "Пластинчатые теплообменники для различных сфер применения с полной локализацией производства. Пароводяные пластинчатые теплообменники, теплообменники вода-вода, гилколь-вода. Теплообменник пластинчатый изготавливается под требования заказчика. Подберем теплообменник для отопления, гвс и специфических условий.",
        },
        template: "./src/plastinchatye-teploobmenniki.html",
        filename: "plastinchatye-teploobmenniki/index.html",
        chunks: ["pto", "all", "map"],
      }),
      /*---------ПРИМЕРЫ РАСЧЁТОВ----------- */
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL: canonicalURL,
          ROUTES,
          raschetsExamples: rawData,
          razbegPoMoshnosti,
        },
        title: "Примеры расчётов разборных пластинчатых теплообменников",
        heading: "Примеры расчётов пластинчатых теплообменников",
        meta: {
          keywords: "пример теплообменника, пример расчёта теплообменника, пример расчёта пластинчатого теплообменника",
          description: "Разборные пластинчатые теплообменники, расчитанные под различные задачи, требования и характеристики. Расчёты теплообменников от 37 квт до 10000 квт.",
        },
        template: "./src/pto-raschets.html",
        filename: "plastinchatye-teploobmenniki/raschets/index.html",
        chunks: ["blogSpecPage", "all", "map"],
      }),
      /*----------АГРЕГ ТО ОТОПЛЕНИЕ---------- */
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL,
          ROUTES,
          raschetsExamples: rawData,
          razbegPoMoshnosti,
        },
        title: "Теплообменники для отопления",
        heading: "Теплообменники для отопления",
        meta: {
          keywords: "теплообменники для отопления",
          description: "Разборные пластинчатые теплообменники для отопления",
        },
        template: "./src/pto-main-otop.html",
        filename: "plastinchatye-teploobmenniki/otoplenie/index.html",
        chunks: ["blogSpecPage", "all", "map"],
      }),
      /*----------АГРЕГ ТО ГВС---------- */
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL,
          ROUTES,
          raschetsExamples: rawData,
          razbegPoMoshnosti,
        },
        title: "Теплообменники для гвс (горячее водоснабжение)",
        heading: "Теплообменники для гвс",
        meta: {
          keywords: "теплообменники для гвс",
          description: "Разборные пластинчатые теплообменники для гвс",
        },
        template: "./src/pto-main-gvs.html",
        filename: "plastinchatye-teploobmenniki/goryachee-vodosnabzhenie-gvs/index.html",
        chunks: ["blogSpecPage", "all", "map"],
      }),
      /*---------ПИЩЕВЫЕ ТЕПЛООМБЕННИКИ----------- */
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL,
          ROUTES,
        },
        title: "Пищевые теплообменники | Теплообменники для пищевой промышленности",
        meta: {
          keywords: "пищевые теплообменники, пластинчатые пищевые теплообменники",
          description: "Полная локализация производства пищевых пластичнатых теплообменников для различных сфер пищевой промышленности под самые сложные технологические процессы.",
        },
        template: "./src/pishchevye-teploobmenniki.html",
        filename: "pishchevye-teploobmenniki.html",
        chunks: ["ptoFood", "all", "map"],
      }) /*---------БЛОЧНЫЕ ТЕПЛОВЫЕ ПУНТЫ----------- */,
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL, 
          btps: btpexamples,
          ROUTES,
        },
        title:
          "Блочные тепловые пункты | Производство тепловых узлов, модулей итп заводской готовности",
        meta: {
          keywords: "блочные тепловые пункты, блочные итп, блочные тепловые узлы",
          description: "Изготовление блочных тепловых пунктов (блочных итп) на базе теплообменников собственного производства. Заводские гарантии на тепловые узлы.",
        },
        template: "./src/blochnye-teplovye-punkty.html",
        filename: "blochnye-teplovye-punkty/index.html",
        chunks: ["btp", "all", "map", "freq"],
      }) /*---------ПАСТЕРИЗАЦИОННЫЕ УСТАНОВКИ----------- */,
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL,
          ROUTES,
        },
        title: "Пастеризационные охладительные установки на базе теплообменников",
        meta: {
          keywords: "пастеризационные охладительные установки, установки поу",
          description: "Производство теплообменных установок (пастеризационно охладительных и других) на базе теплообменников собственного производства. Заводские гарантии.",
        },
        template: "./src/pou.html",
        filename: "pasterizatsionno-okhladitelnye-ustanovki.html",
        chunks: ["pou", "all", "map", "freq"],
      }),
      /*---------СЕРВИС И ЗАПАСНЫЕ ЧАСТИ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES,
         },
        title: "Сервис и обслуживание пластинчатых теплоомбенников Теплохит",
        meta: {
          keywords: "сервис и обслуживание пластинчатого теплообменника",
          description: "Комплектующие всегда в наличии, под Ваш пластинчатый теплообменник Теплохит. Сервисные партнеры по России. Выгодные условия работы для партнеров по обслуживанию пластинчатых теплообменников.",
        },
        template: "./src/service.html",
        filename: "service.html",
        chunks: ["service", "all", "map"],
      }),
      /*---------О КОМПАНИИ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES,
          cycleData
        },
        title: "О производстве пластинчатых теплообменников, этапы производства",
        meta: {
          keywords: "производитель пластинчатых теплобменников",
          description: "Производство пластинчатых теплообменников полного цикла. Разработка и производство пластин и уплотнений для пластинчатого теплообменника",
        },
        template: "./src/about.html",
        filename: "about/index.html",
        chunks: ["about", "all", "map"],
      }),
      /*---------ГАЛЕРЕЯ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES,
          galleryData
        },
        title: "Галерея произвзводства пластинчатых теплообменников и комплектующих к ним",
        meta: {
          keywords: "фото производства пластинчатых теплообменников",
          description: "Вы можете увидеть как производятся пластинчатые теплообменники и теплообменные пластины полностью Российского производства. От размотки ленты нержавеющей стали до формовки и сборки готового теплообменного аппарата.",
        },
        template: "./src/_gallery.html",
        filename: "about/gallery/index.html",
        chunks: ["about", "all", ],
      }),
      /* ВАКАНСИИ 
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES, 
         },
        title: "Вакансии на официальном сайте завода | Работа на производстве",
        meta: {
          keywords: "вакансии барнаул, вакансии инженер",
          description: "Вакансии завода по производству пластинчатых теплобменных аппаратов",
        },
        template: "./src/vakansii.html",
        filename: "about/vakansii/index.html",
        chunks: ["vakansii", "all", "map"],
      }),*/
      /*---------КОНТАКТЫ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES, 
        },
        title: "Контакты ООО Термоблок",
        meta: {
          keywords: "ооо термоблок, контакты",
          description: "Контакты предприятия Термоблок, производство теплообменников в городе Барнаул",
        },
        template: "./src/contacts.html",
        filename: "contacts.html",
        chunks: ["contacts", "all", "map"],
      }) /*---------ПОДБОР И РАСЧЁТ----------- */,
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES,
        },
        title: "Подбор и расчет пластинчатых теплообменников онлайн",
        meta: {
          keywords: "пластинчатый теплообменник подбор, расчет пластинчатого теплообменника онлайн",
          description: "Большой выбор пластинчатых теплообменников. Калькулятор с подбором пластинчатого теплообменника, полный расчет пластинчатого теплообменника онлайн",
        },
        template: "./src/equipment-selection.html",
        filename: "equipment-selection/index.html",
        chunks: ["all", "equipment", "map"], //в чанке equipment лежит equipment1.js!!
      }),

      /*---------СЕКЦИЯ БЛОГА----------- */
      new HtmlWebpackPlugin({
        templateParameters: { 
          isDevServer,
          canonicalURL,
          ROUTES,
          infoBlogData: infoBlogData,
          newsData,
        },
        title: "Новое в производстве пластинчатых теплообменников",
        meta: {
          keywords: "Информация о продукции предприятия: пластинчатых теплобменников для отопления, гвс; теплообменников пищевого назначения",
          description: "Все о термоблоке",
        },
        template: "./src/blog-section.html",
        filename: "blog-proizvodstva/index.html",
        chunks: ["blogSection", "all", "map"],
      }),
      /*---------КАТАЛОГ----------- */
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL,
          ROUTES,
          tis,
          foodtis,
        },
        title: "Каталог пластинчатых теплообменников | Каталог Теплохит",
        meta: {
          keywords: "каталог пластинчатых теплообменников, теплохит каталог",
          description: "Модельный ряд отечественного производителя пластинчатых теплообменников представлен в каталоге. Скачать каталог пластинчатых теплообменников, 3D модели, чертежи теплообменников.",
        },
        template: "./src/catalog.html",
        filename: "catalog/index.html",
        chunks: ["catalog", "all", "map"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: {
          isDevServer,
          canonicalURL,
          ROUTES,
        },
        title: "Согласие на обработку персональных данных",
        meta: {
          keywords: "Согласие на обработку персональных данных",
          description: "Согласие на обработку персональных данных",
        },
        template: "./src/sonsent.html",
        filename: "sonsent/index.html",
        chunks: ["blogSpecPage", "all"],
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new SitemapPlugin({ base: canonicalURL, paths: paths.concat(generatedPaths).sort((a,b)=> b.priority - a.priority) }),
    ].concat(htmlRaschetPlugins, htmlTisPlugins, htmlArticlesPlugins, htmlNewsToBlog, htmlSpecPagesPluginst),
  }
};

const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent('http://10.10.14.14:3128');

function articleDateMapper(newsArr) {
  return newsArr
      .map((item) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        return {
          ...item,
          type: JSON.parse(item.tags),
          formattedDate: item.date ? `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}` : ''
        }
      })
}

function newsDateMapper(newsArr) {
  return newsArr
      .map((item) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        return {
          ...item,
          formattedDate: item.date ? `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}` : ''
        }
      })
}


module.exports = () => {
  const isDevServer = process.env.WEBPACK_SERVE;
  console.log(isDevServer);
  return new Promise((resolve, reject) => {
      Promise.all([
          fetch1('https://api.termoblok.ru/data/blogCards').then(res => res.json()), 
          fetch1('https://api.termoblok.ru/news').then(res => res.json()), 
          fetch1('https://api.termoblok.ru/gallery').then(res => res.json()), 
          //fetch1('https://functions.yandexcloud.net/d4e9aq1evmfdb0cc7uo4?base=objects', { agent: proxyAgent}).then(res => res.json()), 
        ])
        .then((data) => {
          resolve(
            generateConfig(
              articleDateMapper(data[0]), //карточки блока
              newsDateMapper(data[1]), //новости
              data[2], //gallery
              isDevServer
            )
          );
        })
     
  });
}
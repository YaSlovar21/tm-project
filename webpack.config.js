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
const { btpexamples } = require('./btpexamples');
const { tis, foodtis } = require('./tis');
const { specPages } = require('./specPages');
const { cycleData } = require('./consts');

console.log(rawData);

function generateRaschetHtmlPlugins() {
  return rawData.map(ptoData => {
    return new HtmlWebpackPlugin({
      title: ptoData.title ? ptoData.title:  `Какой то расчёт`,
      template: "./src/abstract-raschet-page.html", // шаблон
      filename: `plastinchatye-teploobmenniki/${ptoData.naznach === 'гвс' ? 'goryachee-vodosnabzhenie-gvs' : ptoData.naznach === 'отопление' ? 'otoplenie' : 'raschets'}/${ptoData.path}.html`,
      templateParameters: ptoData,
      razbegPoMoshnosti,
      chunks: ["blogSpecPage", "all", "map"],
    })
  })
};

function generateTisHtmlPlugins() {
  return tis.concat(foodtis).map(ptoData => {
    return new HtmlWebpackPlugin(ptoData)
  })
}

function generateSpecPagesHtmlPlugins() {
  return specPages.map(articleData => {
    return new HtmlWebpackPlugin(articleData)
  })
}

function generateBlogPagesHtmlPlugins(articles) {
  return articles.map(article => {
    return new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: `${article.articleInnerFile}.html`,
        /*relevanceArticles: [
          {
            name: "Теплобоменник для отопления частного дома",
            link: "/blog-proizvodstva/teploobmenniki-otopleniya-chastnogo-doma.html",
          },
        ],*/
      },
      title: article.seoTitle,
      heading: article.h1,
      meta: {
        keywords: article.seoKeywords,
        description: article.seoDesc,
      },
      template: "./src/blog-page-abstract.html",
      filename: `blog-proizvodstva/${article.staticPage}`,
      chunks: ["blogPage", "all", "map"],
    })
  })
}

function generateConfig(infoBlogData) {

  const htmlRaschetPlugins = generateRaschetHtmlPlugins();
  const htmlTisPlugins = generateTisHtmlPlugins();
  const htmlArticlesPlugins = generateBlogPagesHtmlPlugins(infoBlogData);
  const htmlSpecPagesPluginst = generateSpecPagesHtmlPlugins();

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
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
      assetModuleFilename: "images/[hash][ext]",
      //publicPath: ''
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
          ],
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
          tis,
          foodtis,
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
        templateParameters: { canonicalURL },
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
        templateParameters: { canonicalURL },
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
          canonicalURL: canonicalURL,
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
          canonicalURL: canonicalURL,
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
          canonicalURL: canonicalURL,
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
          canonicalURL: canonicalURL,
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
        templateParameters: { canonicalURL: canonicalURL, btps: btpexamples },
        title:
          "Блочные тепловые пункты | Производство тепловых узлов, модулей итп заводской готовности",
        meta: {
          keywords: "блочные тепловые пункты, блочные итп, блочные тепловые узлы",
          description: "Изготовление блочных тепловых пунктов (блочных итп) на базе теплообменников собственного производства. Заводские гарантии на тепловые узлы.",
        },
        template: "./src/blochnye-teplovye-punkty.html",
        filename: "blochnye-teplovye-punkty/index.html",
        chunks: ["btp", "all", "map"],
      }) /*---------ПАСТЕРИЗАЦИОННЫЕ УСТАНОВКИ----------- */,
      new HtmlWebpackPlugin({
        templateParameters: {
          canonicalURL: canonicalURL,
        },
        title: "Пастеризационные охладительные установки на базе теплообменников",
        meta: {
          keywords: "пастеризационные охладительные установки, установки поу",
          description: "Производство теплообменных установок (пастеризационно охладительных и других) на базе теплообменников собственного производства. Заводские гарантии.",
        },
        template: "./src/pou.html",
        filename: "pasterizatsionno-okhladitelnye-ustanovki.html",
        chunks: ["pou", "all", "map"],
      }),
      /*---------СЕРВИС И ЗАПАСНЫЕ ЧАСТИ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { canonicalURL: canonicalURL },
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
          canonicalURL,
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
      /* ВАКАНСИИ */
      new HtmlWebpackPlugin({
        templateParameters: { canonicalURL: canonicalURL },
        title: "Вакансии на официальном сайте завода | Работа на производстве",
        meta: {
          keywords: "вакансии барнаул, вакансии инженер",
          description: "Вакансии завода по производству пластинчатых теплобменных аппаратов",
        },
        template: "./src/vakansii.html",
        filename: "about/vakansii/index.html",
        chunks: ["vakansii", "all", "map"],
      }),
      /*---------КОНТАКТЫ----------- */
      new HtmlWebpackPlugin({
        templateParameters: { canonicalURL: canonicalURL },
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
        templateParameters: { canonicalURL: canonicalURL },
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
        templateParameters: { canonicalURL: canonicalURL },
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
          canonicalURL: canonicalURL,
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

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new SitemapPlugin({ base: canonicalURL, paths }),
    ].concat(htmlRaschetPlugins, htmlTisPlugins, htmlArticlesPlugins,htmlSpecPagesPluginst),
  }
};

const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent('http://10.10.14.14:3128');

module.exports = () => {
  return new Promise((resolve, reject) => {
      Promise.all([
          fetch1('https://functions.yandexcloud.net/d4eivnnhtfhet7j0nvoh', { agent: proxyAgent}).then(res => res.json()), 
          //fetch1('https://functions.yandexcloud.net/d4e9aq1evmfdb0cc7uo4?base=news', { agent: proxyAgent}).then(res => res.json()), 
          //fetch1('https://functions.yandexcloud.net/d4e9aq1evmfdb0cc7uo4?base=objects', { agent: proxyAgent}).then(res => res.json()), 
        ])
        .then((data) => {
          resolve(generateConfig(data[0]));
        })
     
  });
}
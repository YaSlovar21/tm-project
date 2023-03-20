const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const {paths} = require('./sitemap');

//const faviconPath = 'src/images/favicon.svg';
const canonicalURL = 'https://www.termoblok.ru'

const {btpexamples} = require('./btpexamples');

const fs = require('fs');

//import {initialHeatEx} from './src/js/utils/constants.js';
//console.log(initialHeatEx);
const ptoOtop = fs.readFileSync(path.resolve(__dirname, './src/articles') + '/pto-otop.html');
const ptoGvs = fs.readFileSync(path.resolve(__dirname, './src/articles') + '/pto-gvs.html');
const ptoPasteriz = fs.readFileSync(path.resolve(__dirname, './src/articles') + '/pasteriz.html');


module.exports = {
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
        test: /\.mp4$/,
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
      /*{ // грузим инлайново из файлика шаблона страницы блога
       test: /\.html$/,
       include: [
         path.resolve(__dirname, './src/articles/')
       ],
       loader: "html-loader"
      },*/
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
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
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
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
      templateParameters: { canonicalURL },
      title:
        "Российский производитель пластин и пластинчатых теплообменников Термоблок",
      meta: {
        keywords: "российское производство теплообменников",
        description: `ООО Термоблок - производитель пластинчатых теплообменников со 100% локализацией 
          изготовление пластин, уплотнений и ряда комплектующих для теплообменников торговой марки Теплохит`,
      },
      template: "./src/index.html", // путь к файлу index.html
      chunks: ["index", "all", "map"],
    }) /*---------ПРОДУКЦИЯ----------- */,
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL },
      title:
        "Производство теплообменого оборудования и установок. Продукция завода.",
      meta: {
        keywords: "производство теплообменного оборудования",
        description:
          "Отечественный производитель теплообменного оборудования. Изготовление пластинчатых теплообменников, тепловых пунктов.",
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
        description:
          "Пластинчатые теплообменники для различных сфер применения с полной локализацией производства. Пароводяные пластинчатые теплообменники, теплообменники вода-вода, гилколь-вода. Теплообменник пластинчатый изготавливается под требования заказчика. Подберем теплообменник для отопления, гвс и специфических условий.",
      },
      template: "./src/plastinchatye-teploobmenniki.html",
      filename: "plastinchatye-teploobmenniki/index.html",
      chunks: ["pto", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "teploizol.html",
      },
      title:
        "Теплоизоляция теплообменников, изоляция пластинчатых теплообменников",
      heading: "Теплоизоляция теплообменников",
      intro:
        "Предлагаем теплоизоляцию разработанную под линейку отечественных пластинчатых разборных теплообменников Теплохит (ТИ).",
      meta: {
        keywords: "теплоизоляция теплообменников, изоляция теплообменников",
        description:
          "Теплоизоляционные чехлы для пластинчатых теплообменников, разработанные под линейку теплообменников Теплохит.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename: "plastinchatye-teploobmenniki/teploizolyaciya.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "plastina.html",
      },
      title: "Пластины пластинатого теплообменника",
      heading: "Пластина пластинатого теплообменника",
      intro:
        "Пластины пластинчатых теплообменников, 100% локализация производства.",
      meta: {
        keywords: "пластина пластинатого теплообменника",
        description:
          "Конструктивные особенности пластины пластинчатого теплообменника. Эффективность пластины. Теплообмен.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename:
        "plastinchatye-teploobmenniki/plastina-plastinchatogo-teploobmennika.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "uplotnenie.html",
      },
      title: "Уплотнения для теплообменника",
      heading: "Уплотнение пластинатого теплообменника",
      intro:
        "Уплотнения резиновые для пластинчатых теплообменников от производителя.",
      meta: {
        keywords: "уплотнение пластинатого теплообменника",
        description:
          "Конструктивные особенности уплотнения пластинчатого теплообменника. Эффективность. Теплообмен.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename:
        "plastinchatye-teploobmenniki/uplotnenie-plastinchatogo-teploobmennika.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "harakteristiki.html",
      },
      title: "Характеристики пластинчатого теплообменника",
      heading: "Характеристики пластинчатых теплобменников",
      intro:
        "Технические характеристики конструкции теплообменных аппаратов, технические условия и параметры для расчёта.",
      meta: {
        keywords: "характеристики пластинчатого теплообменника",
        description:
          "Технические характеристики пластинчатых теплообменников: максимальное рабочее давление, площадь теплообмена, толщина пластины, условный проход (ду) и прочее.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename:
        "plastinchatye-teploobmenniki/harakteristiki-plastinchatogo-teploobmennika.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "promyvka.html",
      },
      title: "Промывка пластинчатого теплообменника",
      heading: "Промывка теплообменника",
      intro:
        "Как правильно осуществлять промывку разборного пластинчатого теплообменника, какими средствами. Нюансы.",
      meta: {
        keywords: "промывка пластинчатого теплообменника",
        description:
          "Рекомендации по промывке пластинчатого теплообменника от производителя: виды загрязнений, способы промывки, средства промывки.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename: "plastinchatye-teploobmenniki/promyvka-teploobmennika.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "princip.html",
      },
      title: "Пластинчатый теплообменник: принцип работы и устройство",
      heading: "Принцип работы пластинчатого теплообменника",
      intro:
        "Работа и устройство пластинчатого теплообменника. Как устроен пластинчатый теплообменник? Основной принцип работы пластинчатого теплообменника.",
      meta: {
        keywords:
          "принцип работы пластинчатого теплообменника, устройство пластинчатого теплообменника",
        description:
          "Основной принцип работы пластинчатого теплообменника, схемы и особенности устройства. Пластинчатый теплообменник устроен таким образом, что смешения сред не происходит.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename: "plastinchatye-teploobmenniki/princip-raboty-i-ustrojstvo.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "montazh.html",
      },
      title:
        "Монтаж пластинчатого теплообменника, ввод в эксплуатацию теплообменного аппрата",
      heading: "Монтаж пластинчатого теплообменника",
      intro:
        "Как осуществляется монтаж теплообменного аппарата? Особенности монтажа пластинчатых теплообменников. Важные моменты на что нужно обратить внимание при монтаже, запуске теплообменного аппарата.",
      meta: {
        keywords:
          "монтаж пластинчатого теплообменника, монтаж теплобменника, монтаж теплообменного аппарата",
        description:
          "Как правильно выполнить монтаж пластинчатого теплообменного аппарата и запустить теплообменник в работу? Важные моменты, которые нужно учесть при монтаже теплообменника.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename: "plastinchatye-teploobmenniki/montazh-teploobmennika.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "programma.html",
      },
      title: "Программа расчёта пластинчатого теплообменника",
      heading: "Программа расчёта пластинчатого теплообменника",
      intro:
        "Программа подбора и расчёта теплообменников на базе теплообменных пластин ТИ",
      meta: {
        keywords:
          "монтаж пластинчатого теплообменника, монтаж теплобменника, монтаж теплообменного аппарата",
        description: "Вы можете скачать программу расчёта теплообменников.",
      },
      template: "./src/blogspec-page-abstract.html",
      filename: "plastinchatye-teploobmenniki/programma-rascheta.html",
      chunks: ["blogSpecPage", "all", "map"],
    }),
    /*---------ПИЩЕВЫЕ ТЕПЛООМБЕННИКИ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title:
        "Пищевые теплообменники | Теплообменники для пищевой промышленности",
      meta: {
        keywords: "пищевые теплообменники, пластинчатые пищевые теплообменники",
        description:
          "Полная локализация производства пищевых пластичнатых теплообменников для различных сфер пищевой промышленности под самые сложные технологические процессы.",
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
        description:
          "Изготовление блочных тепловых пунктов (блочных итп) на базе теплообменников собственного производства. Заводские гарантии на тепловые узлы.",
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
        description:
          "Производство теплообменных установок (пастеризационно охладительных и других) на базе теплообменников собственного производства. Заводские гарантии.",
      },
      template: "./src/pou.html",
      filename: "pasterizatsionno-okhladitelnye-ustanovki.html",
      chunks: ["pou", "all", "map"],
    }) /*---------СЕРВИС И ЗАПАСНЫЕ ЧАСТИ----------- */,
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Сервис и обслуживание пластинчатых теплоомбенников Теплохит",
      meta: {
        keywords: "сервис и обслуживание пластинчатого теплообменника",
        description:
          "Комплектующие всегда в наличии, под Ваш пластинчатый теплообменник Теплохит. Сервисные партнеры по России. Выгодные условия работы для партнеров по обслуживанию пластинчатых теплообменников.",
      },
      template: "./src/service.html",
      filename: "service.html",
      chunks: ["service", "all", "map"],
    }) /*---------О КОМПАНИИ----------- */,
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "О производстве пластинчатых теплообменников, этапы производства",
      meta: {
        keywords: "производитель пластинчатых теплобменников",
        description:
          "Производство пластинчатых теплообменников полного цикла. Разработка и производство пластин и уплотнений для пластинчатого теплообменника",
      },
      template: "./src/about.html",
      filename: "about/index.html",
      chunks: ["about", "all", "map"],
    }),
    /*
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL, },
      title: "Для фирм, производителей теплоообменного оборудования",
      intro: "Для фирм, занимающихся обслуживанием и монтажем теплообменного оборудования. Производителям теплобменного оборудования на базе теплообменников или пластин теплообменников.",
      meta: {
        keywords: "",
        description: "",
      },
      template: "./src/about-partners.html",
      filename: "about/partners/index.html",
      chunks: ["vakansii", "all", "map"],
    }),
    /* ВАКАНСИИ */
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Вакансии на официальном сайте завода | Работа на производстве",
      meta: {
        keywords: "вакансии барнаул, вакансии инженер",
        description:
          "Вакансии завода по производству пластинчатых теплобменных аппаратов",
      },
      template: "./src/vakansii.html",
      filename: "about/vakansii/index.html",
      chunks: ["vakansii", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Вакансия инженера-конструктора Барнаул | Завод",
      meta: {
        keywords: "вакансии барнаул, вакансии инженер конструктор",
        description:
          "Быстрорастущему предприятию по производству теплообменного оборудования требуется инженер-конструктор. Подробнее о вакасии.",
      },
      template: "./src/vakansii-ing-btp.html",
      filename: "about/vakansii/vakansiya-inzhenera-konstruktora-barnaul.html",
      chunks: ["vakansii", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Вакансия экономиста Барнаул",
      meta: {
        keywords: "вакансии барнаул, вакансии экономист",
        description:
          "Быстрорастущему предприятию по производству теплообменного оборудования требуется ведущий экономист. Подробнее о вакасии.",
      },
      template: "./src/vakansii-economist.html",
      filename: "about/vakansii/vakansiya-economista-barnaul.html",
      chunks: ["vakansii", "all", "map"],
    }),
    /*---------КОНТАКТЫ----------- */
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Контакты ООО Термоблок",
      meta: {
        keywords: "ооо термоблок, контакты",
        description:
          "Контакты предприятия Термоблок, производство теплообменников в городе Барнаул",
      },
      template: "./src/contacts.html",
      filename: "contacts.html",
      chunks: ["contacts", "all", "map"],
    }) /*---------ПОДБОР И РАСЧЁТ----------- */,
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Подбор и расчет пластинчатых теплообменников онлайн",
      meta: {
        keywords:
          "пластинчатый теплообменник подбор, расчет пластинчатого теплообменника онлайн",
        description:
          "Большой выбор пластинчатых теплообменников. Калькулятор с подбором пластинчатого теплообменника, полный расчет пластинчатого теплообменника онлайн",
      },
      template: "./src/equipment-selection.html",
      filename: "equipment-selection/index.html",
      chunks: ["all", "equipment", "map"], //в чанке equipment лежит equipment1.js!!
    }) /*---------СЕКЦИЯ БЛОГА----------- */,
    new HtmlWebpackPlugin({
      templateParameters: { canonicalURL: canonicalURL },
      title: "Новое в производстве пластинчатых теплообменников",
      meta: {
        keywords:
          "Информация о продукции предприятия: пластинчатых теплобменников для отопления, гвс; теплообменников пищевого назначения",
        description: "Все о термоблоке",
      },
      template: "./src/blog-section.html",
      filename: "blog-proizvodstva/index.html",
      chunks: ["blogSection", "all", "map"],
    }),
    /*---------СТРАНИЦЫ БЛОГА----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pto-otop.html",
        relevanceArticles: [
          {
            name: "Теплобоменник для отопления частного дома",
            link: "/blog-proizvodstva/teploobmenniki-otopleniya-chastnogo-doma.html",
          },
          {
            name: "Пластинчатый теплообменник для отопления 5 мвт для котельной",
            link: "/blog-proizvodstva/teploobmennik-5-mvt-object-spb.html",
          },
          {
            name: "Теплообменник отопления 17500 кВт",
            link: "/blog-proizvodstva/teploobmenniki-gvs-object-p-zaton-vostok.html",
          },
          {
            name: "Пластинчатые теплообменники в системе отопления итп многоквартирного дома",
            link: "/blog-proizvodstva/teploobmenniki-gvs-object-p-umnii-dom.html",
          },
          {
            name: "Теплообменники в многоквартирном доме",
            link: "/blog-proizvodstva/teploobmenniki-mnogokvartirnogo-doma.html",
          },
        ],
      },
      title: "Пластинчатые теплообменники для отопления",
      heading: "Теплообменники для отопления",
      meta: {
        keywords:
          "теплообменники отопления, пластинчатые теплообменники отопления",
        description:
          "Как подобрать пластинчатый теплообменник для отопления, особенности производства и применения. Онлайн форма для подбора теплообменника системы отопления.",
      },
      //article: ptoOtop,
      template: "./src/blog-page-abstract.html",
      filename:
        "blog-proizvodstva/plastinchatye-teploobmenniki-otopleniya.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pto-gvs.html",
        relevanceArticles: [
          {
            name: "Теплобоменник для ГВС 3,5 гкал/ч (г. Тимашевск)",
            link: "/blog-proizvodstva/teploobmenniki-gvs-object-u-timashevsk.html",
          },
          {
            name: "Теплобоменник ГВС (моноблок) в итп умного дома (г. Уфа)",
            link: "/blog-proizvodstva/teploobmenniki-gvs-object-p-umnii-dom.html",
          },
        ],
      },
      title:
        "Теплообменники горячего водоснабжения ГВС пластинчатые | Моноблок ГВС",
      heading: "Теплообменники горячего водоснабжения",
      meta: {
        keywords:
          "теплообменники гвс, пластинчатые теплообменники гвс, теплообменник горячего водоснабжения",
        description: `Подробно про теплообменники систем горячего водоснабжения, расчёт теплообменника гвс. Схемы подключения системы горячего водоснабжения через теплообменник.`,
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/plastinchatye-teploobmenniki-gvs.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "par-voda.html",
        relevanceArticles: [
          {
            name: "Пароводяные теплообменники в системах отопления",
            link: "/blog-proizvodstva/plastinchatye-teploobmenniki-otopleniya.html",
          },
        ],
        buttonText: "Подобрать пароводяной теплообменник",
      },
      title: "Теплообменник пар вода пластинчатый | Пароводяной теплообменник",
      heading: "Теплообменник нагрева воды паром",
      meta: {
        keywords:
          "теплообменник пар вода, теплообменник пароводяной, теплообменник паровой",
        description: "Как происходит нагрев воды паром через теплообменник?",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmennik-par-voda-plastinchatyy.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "glikol-voda.html",
        buttonText: "Подобрать теплообменник для гликоля",
        relevanceArticles: [
          {
            name: "Теплообменники для снеготаяния",
            link: "/blog-proizvodstva/teploobmennik-dlya-sistemy-snegotayaniya.html"
          }
        ],
      },
      title: "Теплообменник гликоль вода | Пароводяной теплообменник",
      heading: "Теплообменники для гликоля",
      meta: {
        keywords:
          "теплообменник гликоль вода, теплообменник пропиленгликоль, теплообменник этиленгликоль",
        description:
          "Особенности применения теплообменников гликоль-вода, примеры расчётов теплообменных аппаратов под пропиленгликоль и этиленгликоль. Где применяется теплообменник гликоль-вода, сферы и области.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmennik-glikol-voda.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pto-snegotayanie.html",
        relevanceArticles: [
          {
            name: "Теплообменники гликоль-вода",
            link: "/blog-proizvodstva/teploobmennik-glikol-voda.html"
          }
        ],
      },
      title: "Теплообменник для системы снеготаяния пластинчатый",
      heading: "Теплообменники для системы снеготаяния",
      meta: {
        keywords:
          "теплообменник для системы снеготаяния",
        description:
          "Что такое теплообменник в системе снеготаяния? Схема такой системы и пример расчёта теплообменника для системы снеготаяния.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmennik-dlya-sistemy-snegotayaniya.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pto-mkd.html",
        buttonText: "Подобрать теплообменник для многоквартирного дома",
        relevanceArticles: [
          {
            name: "Теплобоменник для отопления частного дома",
            link: "/blog-proizvodstva/teploobmenniki-otopleniya-chastnogo-doma.html",
          },
        ],
      },
      title: "Теплообменники в многоквартирном доме мкд, итп жилого дома",
      heading: "Теплообменники для многоквартирного дома",
      meta: {
        keywords: "теплообменник в многоквартирном доме, теплообменник мкд",
        description:
          "Теплообменники в многоквартирном доме (мкд): как выбрать теплообменник? как работают теплообменники в жилых домах? Рассчитать и приобрести теплообменник мкд.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmenniki-mnogokvartirnogo-doma.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: false,
        articleFile: "pasteriz.html",
      },
      title:
        "Пластинчатые пастеризаторы для молока, сливок, пива | Преимущества над трубчатыми",
      heading: "Пластинчатые пастеризаторы",
      meta: {
        keywords: "пастеризатор, пластинчатый пастеризатор",
        description:
          "Производство пластинчатых пастеризаторов, особенности использования. Как подобрать пластинчатый пастеризатор для молочной промышленности и других пищевых производств.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/plastinchatyy-pasterizator.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "utermo-timashevsk.html",
      },
      title: "Пластинчатый теплообменник 3,5 Гкал/ч для ГВС",
      heading: "Два теплообменника по 3,5 Гкал/ч для горячего водоснабжения",
      meta: {
        keywords: "теплообменник для гвс",
        description:
          "Два теплообменника пластинчатых в кондитерском комбинате Кубань (город Тимашевск), один из которых резервный. Теплообменники в системе горячего водоснабжения.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmenniki-gvs-object-u-timashevsk.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "partner-zaton-vostok.html",
      },
      title: "Пластинчатый теплообменник мощностью 17500 кВт в котельной",
      heading: "Теплообменник пластинчатый в котельной жилого района",
      meta: {
        keywords: "пластинчатый теплообменник котельной",
        description:
          "Теплообменник пластичнатый ТИ82-201 в котельной квартала 34 жилого района Затон-Восточный, г. Уфа",
      },
      template: "./src/blog-page-abstract.html",
      filename:
        "blog-proizvodstva/teploobmenniki-gvs-object-p-zaton-vostok.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "partner-umn-dom.html",
      },
      title:
        "Теплообменники отопления, гвс, теплого пола в ИТП для умного дома в г. Уфа",
      heading: "Теплообменники в ИТП для умного дома в г. Уфа",
      meta: {
        keywords: "теплообменник для итп, теплообменники в умном доме",
        description:
          "Теплообменники ТИ13 пластинчатые в тепловом пункте умного дома в городе Уфа.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmenniki-gvs-object-p-umnii-dom.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: false,
        articleFile: "mnogosektsionnye.html",
      },
      title: "Многосекционные теплообменники от производителя",
      heading: "Многосекционные пластинчатые теплообменники",
      meta: {
        keywords:
          "многосекционные теплообменники, многосекционные пластинчатые теплообменники",
        description:
          "Производство многосекционных пластинчатых теплообменников, в том числе пищевого назначения.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/mnogosektsionnye-teploobmenniki.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "advantage-plates.html",
      },
      title: "Преимущества пластинчатых теплообменников",
      heading: "Преимущества теплообменников пластинчатого типа",
      meta: {
        keywords: "пластинчатые теплообменники преимущества",
        description:
          "Преимущества пластинчатых теплообменников над кожухотрубными. Особенности использования пластинчатых теплообменников. Одно из основных преимуществ - удобство сервиса.",
      },
      template: "./src/blog-page-abstract.html",
      filename:
        "blog-proizvodstva/preimushchestva-plastinchatykh-teploobmennikov.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "btp-start.html",
        buttonText: "Подобрать теплообменник к тепловому пункту",
      },

      title:
        "Проектирование блочных тепловых пунктов и подбор теплового пункта ",
      heading: "Проектирование тепловых пунктов",
      meta: {
        keywords: "проект блочного теплового пункта, расчёт теплового пункта",
        description:
          "Основная задача проектирования теплового пункта - обеспечить соответствие требованиям заказчика. Блочный тепловой пункт подбирается индивидуально",
      },
      template: "./src/blog-page-abstract.html",
      filename:
        "blog-proizvodstva/proektirovanie-blochnykh-teplovykh-punktov.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: false,
        articleFile: "ool-3-5.html",
        relevanceArticles: [
          {
            name: "Пластинчатый охладитель ООЛ-10",
            link: "/blog-proizvodstva/plastinchatii-ohladitel-ool-10.html",
          },
        ],
      },
      title:
        "Пластинчатые охладители молока | Охлаждение в потоке | ООЛ-3 | ООЛ-5",
      heading: "Пластинчатые охладители ООЛ",
      meta: {
        keywords: "пластинчатые охладители оол, пластинчатые охладители молока",
        description:
          "Примеры расчётов, принцип действия пластинчатых охладителей молока для молочных ферм и заводов. Охлаждение молока в потоке.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/plastinchatye-ohladiteli-ool.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: false,
        articleFile: "ool-10.html",
      },
      title: "Пластинчатый охладитель молока ООЛ-10",
      heading: "Пластинчатый теплообменник охладитель ООЛ-10",
      meta: {
        keywords: "пластинчатый охладитель оол, пластинчатые охладители молока",
        description:
          "Пластинчатый теплообменник охлаждения 10000 литров в час молока. Пример расчёта, принцип действия теплообменника охладителя молока для молочных ферм и заводов.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/plastinchatii-ohladitel-ool-10.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "hortek-tc-sea.html",
      },
      title:
        "Теплообменник 5 мВт для отопления | Для крышной котельной | г. Санкт-Петербург",
      heading: "Теплообменник пластинчатый для крышной котельной",
      meta: {
        keywords: "теплообменник пластинчатый санкт петербург",
        description:
          "Пример расчёта теплообменника котельной мощностью 5 мВт поставленного в бизнес-центр Морская Сталица города Санкт-Петербург",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmennik-5-mvt-object-spb.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "du-250-tech.html",
      },
      title:
        "Пластинчатый теплообменник ДУ250 | Внедрение в производство нового теплообменника",
      heading: "Пластинчатый теплообменник ДУ250",
      meta: {
        keywords: "теплообменник пластинчатый ду250",
        description:
          "Как внедряются в производство новые пластинчатые теплообменники. Первый пластинчатый теплообменник ДУ250 российского производства. Разработка и изготовление пластин и уплотнений, подготовка конструкторской документации.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/plastinchatii-teploobmennik-du-250.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "du-250-gazeta.html",
        relevanceArticles: [
          {
            name: "Теплобоменник пластинчатый ДУ250",
            link: "/blog-proizvodstva/plastinchatii-teploobmennik-du-250.html",
          },
        ],
      },
      title:
        "О самых больших пластинчатых теплообменниках в газете Красная Звезда",
      heading: "Статья в газете Красная звезда",
      meta: {
        keywords: "статья про пластинчатые теплообменники",
        description:
          "Статья про импортозамещение пластинчатых теплообменников на территории России. Теплообменники ДУ 250 на базе пластины собственного производства для предприятия Липецкой экономической зоны.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmennik-du-250-v-gazete.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pto-otop-private-house.html",
      },
      title: "Теплообменники для отопления частного дома | Как выбрать",
      heading: "Теплообменник отопления частного дома",
      meta: {
        keywords: "теплообменник для частного дома",
        description:
          "Теплообменник системы отопления частного дома: как устроен, конструкция, особенности выбора. Частный дом и коттедж: с теплообменником или без?",
      },
      template: "./src/blog-page-abstract.html",
      filename:
        "blog-proizvodstva/teploobmenniki-otopleniya-chastnogo-doma.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pto-oprosnii.html",
      },
      title: "Опросный лист для теплообменника пластинчатого | Скачать",
      heading: "Опросный лист для подбора",
      meta: {
        keywords: "опросный лист на пластинчатый теплообменник",
        description:
          "Скачать опросный лист для подбора пластинчатого теплообменника. Какие данные необходимо указать в опросном листе?",
      },
      template: "./src/blog-page-abstract.html",
      filename:
        "blog-proizvodstva/oprosnyj-list-dlya-plastinchatogo-teploobmennika.html",
      chunks: ["blogPage", "all", "map"],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
        isGkh: true,
        articleFile: "pool.html",
        buttonText: "Рассчитать теплообменник для бассейна",
      },
      title: "Теплообменник для бассейна - пример расчёта и особенности",
      heading: "Пластинчатый теплообменник для бассейна",
      meta: {
        keywords: "теплообменник бассейна, пластинчатый теплообменник бассейна",
        description:
          "Пример расчёта и использование теплообменника на бассейне. Как правильно рассчитать теплообменник для подогрева чаши воды.",
      },
      template: "./src/blog-page-abstract.html",
      filename: "blog-proizvodstva/teploobmennik-dlya-bassejna.html",
      chunks: ["blogPage", "all", "map"],
    }),
    /*---------КАТАЛОГ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: "Каталог пластинчатых теплообменников | Каталог Теплохит",
      meta: {
        keywords: "каталог пластинчатых теплообменников, теплохит каталог",
        description:
          "Модельный ряд отечественного производителя пластинчатых теплообменников представлен в каталоге. Скачать каталог пластинчатых теплообменников, 3D модели, чертежи теплообменников.",
      },
      template: "./src/catalog.html",
      filename: "catalog/index.html",
      chunks: ["catalog", "all", "map"],
    }),
    /*---------------------ТЕПЛООБМЕННИКИ------------------------------------------*/
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ025 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-025.html",
      templateParameters: {
        tialias: "ti025.png",
        drawalias: "draw025.jpg",
        heading: "ТИ 025",
        headingAlias: "ТИ025",
        description: `ТИ025 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Применение: небольшие промышленные помещения, коттеджи, здания детских садов, подогрев бассейнов, обогрев гаражных помещений.`,
        link3d: "https://disk.yandex.ru/d/Lo1bdjAoi7LVyQ",
      },
      chunks: ["ti", "all"],
    }) /*--2-------ТИ077----------- */,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ077 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-077.html",
      templateParameters: {
        tialias: "ti077.png",
        drawalias: "draw077.jpg",
        heading: "ТИ 077",
        headingAlias: "ТИ077",
        description: `ТИ077 – имеет широкую гамму подключения подтрубков: Ду25, Ду32, Ду40. 
          Подходит для задач ЖКХ на типовые 5ти этажные дома.
          Типоразмер также часто применяется в пищевой отрасли. (в т.ч. в многоступенчатом исполнении)`,
        link3d: "https://disk.yandex.ru/d/kEiGbHo7Fi8Uwg",
      },
      chunks: ["ti", "all"],
    }) /*---3------ТИ13----------- */,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ13 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-13.html",
      templateParameters: {
        tialias: "ti13.png",
        drawalias: "draw13.jpg",
        heading: "ТИ 13",
        headingAlias: "ТИ13",
        description: `ТИ13 – имеет подключения подтрубков: Ду50, Ду65. 
        Применение: если ориентироваться на жилые дома, данный теплообменник подходит на типовой 4-6 подъездный 9-ти этажный жилой дом.`,
        link3d: "https://disk.yandex.ru/d/7C26Ov2CVbgl6w",
      },
      chunks: ["ti", "all"],
    }) /*--4-------ТИ18-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ18 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-18.html",
      templateParameters: {
        tialias: "ti18.png",
        drawalias: "draw18.jpg",
        heading: "ТИ 18",
        headingAlias: "ТИ18",
        description: `ТИ18 – имеет гамму подключения подтрубков: Ду50, Ду65.
          Применение: если ориентироваться на жилые дома, данный теплообменник зачастую используются в многоквартирных высотных домах.
          Теплообменный аппарат похож на ТИ13, но в отличие от него лучше справляется с более жесткими температурными режимами`,
        link3d: "https://disk.yandex.ru/d/O2lzhXAOWaA4ug",
      },
      chunks: ["ti", "all"],
    }) /*--5-------ТИ16,5-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ16,5 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-16-5.html",
      templateParameters: {
        tialias: "ti18.png",
        drawalias: "draw16-5.jpg",
        heading: "ТИ 16,5",
        headingAlias: "ТИ16,5",
        description: `ТИ16,5 – имеет подключение подтрубков ДУ50, ДУ65, ДУ80.
        Если температурные графики не типовые (не отопление и гвс), с небольшим перепадом температур, 
        специфические среды, программа расчёта вероятно подберет данный теплообменник. 
        Зачастую он подбирается, когда требуется охладить жидкость на 1-3 градуса при небольших тепловых нагрузках`,
      },
      chunks: ["ti", "all"],
    }) /*--6-------ТИ28-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ28 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-28.html",
      templateParameters: {
        tialias: "ti28.png",
        drawalias: "draw28.jpg",
        heading: "ТИ 28",
        headingAlias: "ТИ28",
        description: `ТИ28 – имеет подключения подтрубков: ДУ100, ДУ125.
          `,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*--7-------ТИ45-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ45 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-45.html",
      templateParameters: {
        tialias: "ti45.png",
        drawalias: "draw45.jpg",
        heading: "ТИ 45",
        headingAlias: "ТИ45",
        description: `ТИ45 – имеет подключения подтрубков: ДУ100, ДУ125. 
          `,
        link3d: "https://disk.yandex.ru/d/xl08RXlp73-Bzw",
      },
      chunks: ["ti", "all"],
    }) /*--8-------ТИ52-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ52 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-52.html",
      templateParameters: {
        tialias: "ti52.png",
        drawalias: "draw52.jpg",
        heading: "ТИ 52",
        headingAlias: "ТИ52",
        description: `ТИ52 – имеет подключение ДУ150.
        Применение: промышленные заводы, центральные тепловые пункты (ЦТП), центральные котельные. 
        Масштаб обогрева - микрорайоны, большие торговые и бизнес центры (крупной квадратуры от 15 000 квадратных метров и более)`,
        link3d: "https://disk.yandex.ru/d/PV1ctuxUcru8nA",
      },
      chunks: ["ti", "all"],
    }) /*--9-------ТИ65-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ65 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-65.html",
      templateParameters: {
        tialias: "ti65.png",
        drawalias: "draw52.jpg",
        heading: "ТИ 65",
        headingAlias: "ТИ65",
        description: `ТИ65 – имеет подключения подтрубков: ДУ100, ДУ125. 
          `,
        link3d: "https://disk.yandex.ru/d/1c62zYE1I9yvyA",
      },
      chunks: ["ti", "all"],
    }) /*-10-------ТИ82-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ82 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-82.html",
      templateParameters: {
        tialias: "ti82.png",
        drawalias: "draw82.jpg",
        heading: "ТИ 82",
        headingAlias: "ТИ82",
        description: `ТИ82 – имеет подключение ДУ150. В отличие от ТИ52 имеет более удлиненную пластину, что позволяет удерживать больший перепад температур.
          Применение аналогичное ТИ52: промышленные заводы, центральные тепловые пункты (ЦТП), котельные микрорайонов. 
          Зачастую применяется также в больших торговых и бизнес центрах (крупной квадратуры от 15 000 квадратных метров и более).`,
        link3d: "https://disk.yandex.ru/d/p4EH75u--S1Dzg",
      },
      chunks: ["ti", "all"],
    }) /*-11-------ТИ95-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ95 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-95.html",
      templateParameters: {
        tialias: "ti95.png",
        drawalias: "draw95.jpg",
        heading: "ТИ 95",
        headingAlias: "ТИ95",
        description: `ТИ95 – имеет подключения подтрубков: ДУ200, ДУ250.
        Применение: ТЭЦ. (Обогревается совокупность микрорайонов)`,
        link3d: "https://disk.yandex.ru/d/rqyEmjeBzRgdZg",
      },
      chunks: ["ti", "all"],
    }) /*-12-------ТИ116-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник ТИ116 пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/ti-116.html",
      templateParameters: {
        tialias: "ti95.png",
        drawalias: "draw116.jpg",
        heading: "ТИ 116",
        headingAlias: "ТИ116",
        description: `ТИ116 – имеет подключения подтрубков: ДУ200, ДУ250.
          Применение: ТЭЦ. (Обогревается совокупность микрорайонов)`,
      },
      chunks: ["ti", "all"],
    }) /*ПИЩЕВЫЕ */,
    /*-1-------П025-----------*/
    new HtmlWebpackPlugin({
      title: "Теплообменник П025 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-025.html",
      templateParameters: {
        tialias: "p025.png",
        drawalias: "draw116.jpg",
        heading: "П025",
        headingAlias: "П 025",
        description: `Теплообменник П025 пищевого назначения. Отличием от типового исполнения (ТИ 025) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-2-------П077-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П077 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-077.html",
      templateParameters: {
        tialias: "p077.png",
        drawalias: "draw116.jpg",
        heading: "П077",
        headingAlias: "П 077",
        description: `Теплообменник П077 пищевого назначения. Отличием от типового исполнения (ТИ 077) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-3-------П13-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П13 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-13.html",
      templateParameters: {
        tialias: "p13.png",
        drawalias: "draw116.jpg",
        heading: "П13",
        headingAlias: "П 13",
        description: `Теплообменник П13 пищевого назначения. Отличием от типового исполнения (ТИ 13) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-3-------П18-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П18 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-18.html",
      templateParameters: {
        tialias: "p18.png",
        drawalias: "draw116.jpg",
        heading: "П18",
        headingAlias: "П 18",
        description: `Теплообменник П18 пищевого назначения. Отличием от типового исполнения (ТИ 18) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
      },
      chunks: ["ti", "all"],
    }) /*-4-------П16,5-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П16,5 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-16-5.html",
      templateParameters: {
        tialias: "p18.png", ///ЖДЕМ ФОТО
        drawalias: "draw116.jpg",
        heading: "П16,5",
        headingAlias: "П 16,5",
        description: `Теплообменник П16,5 пищевого назначения. Отличием от типового исполнения (ТИ 16,5) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-5-------П28-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П28 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-28.html",
      templateParameters: {
        tialias: "p28.png",
        drawalias: "draw116.jpg",
        heading: "П28",
        headingAlias: "П 28",
        description: `Теплообменник П28 пищевого назначения. Отличием от типового исполнения (ТИ 28) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-6-------П45-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П45 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-45.html",
      templateParameters: {
        tialias: "p45.png",
        drawalias: "draw116.jpg",
        heading: "П45",
        headingAlias: "П 45",
        description: `Теплообменник П45 пищевого назначения. Отличием от типового исполнения (ТИ 45) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-7-------П52-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П52 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-52.html",
      templateParameters: {
        tialias: "p52.png",
        heading: "П52",
        headingAlias: "П 52",
        drawalias: "draw116.jpg",
        description: `Теплообменник П52 пищевого назначения. Отличием от типового исполнения (ТИ 52) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }) /*-8-------П65-----------*/,
    new HtmlWebpackPlugin({
      title: "Теплообменник П65 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-65.html",
      templateParameters: {
        tialias: "p65.png",
        drawalias: "draw116.jpg",
        heading: "П65",
        headingAlias: "П 65",
        description: `Теплообменник П65 пищевого назначения. Отличием от типового исполнения (ТИ 65) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }),
    new HtmlWebpackPlugin({
      title: "Теплообменник П82 пищевой пластинчатый разборный",
      template: "./src/ti-xx-xx.html", // шаблон
      filename: "catalog/p-82.html",
      templateParameters: {
        tialias: "p65.png",
        drawalias: "draw116.jpg",
        heading: "П82",
        headingAlias: "П 82",
        description: `Теплообменник П82 пищевого назначения. Отличием от типового исполнения (ТИ 82) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
      },
      chunks: ["ti", "all"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new SitemapPlugin({ base: canonicalURL, paths }),
  ],
};
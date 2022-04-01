const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const {paths} = require('./sitemap');

//const faviconPath = 'src/images/favicon.svg';
const canonicalURL = 'https://www.profi-heat.ru'

const fs = require('fs');

//import {initialHeatEx} from './src/js/utils/constants.js';
//console.log(initialHeatEx);
const ptoOtop = fs.readFileSync(path.resolve(__dirname, './src/articles') + '/pto-otop.html');
const ptoGvs = fs.readFileSync(path.resolve(__dirname, './src/articles') + '/pto-gvs.html');
const ptoPasteriz = fs.readFileSync(path.resolve(__dirname, './src/articles') + '/pasteriz.html');

module.exports = {
  entry: { 
    index: './src/pages/index.js',
    all: './src/pages/all.js',
    map: './src/pages/map.js',
    pto: './src/pages/pto.js',
    ti: './src/pages/ti.js',
    catalog: './src/pages/catalog.js',
    btp: './src/pages/btp.js',
    ptoFood: './src/pages/pto-food.js',
    production: './src/pages/production.js',
    service: './src/pages/service.js',
    about: './src/pages/about.js',
    contacts: './src/pages/contacts.js',
    blogSection: './src/pages/blog-section.js',
    blogPage: './src/pages/blog-page.js',
    equipment: './src/pages/equipment1.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    assetModuleFilename: 'images/[hash][ext]',
    //publicPath: ''
  },
    // добавили режим разработчика
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      {
        test: /\.mp4$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "videos"
                }
            }
        ]
    },
    {
      test: /favicon\.svg/,
      use: [
          {
              loader: "file-loader",
              options: {
                  name: "[name].[ext]",
                  outputPath: ""
              }
          }
      ]
  },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        exclude: [
          path.resolve(__dirname, './src/images/favicon.svg')
        ]
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(doc|pdf)$/,
        use: [
          {
              loader: "file-loader",
              options: {
                  name: "[name].[ext]",
                  outputPath: "docu"
              }
          }
        ]
      },
      {
        test: /CNAME/,
        loader: 'file-loader',
        options: {
          name: '[name]',
        },
      },
      
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          // добавьте объект options
          options: { importLoaders: 1 }
        },
          // Добавьте postcss-loader
        'postcss-loader']
      }, 
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: 'Российский производитель пластин и пластинчатых теплообменников Термоблок',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/index.html', // путь к файлу index.html
      chunks: ['index', 'all', 'map'],
    }),                                   /*---------ПРОДУКЦИЯ----------- */
    new HtmlWebpackPlugin({   
      templateParameters: {
        canonicalURL,
      },

      title: 'Производство теплообменого оборудования, пластинчатых теплообменников, тепловых пунктов',
      meta: {
        keywords: 'производство теплообменного оборудования', 
        description: 'Все о термоблоке'
      },
      template: './src/production.html', 
      filename: 'production.html',
      chunks: ['production', 'all'],
      inject: true,
    }),                                             /*---------ПРИМЕР РАСЧЁТА----------- */
      new HtmlWebpackPlugin({   
      templateParameters: {
        canonicalURL,
      },
      title: 'Пример расчёта',
      meta: {
        keywords: 'производство теплообменного оборудования', 
        description: 'Все о термоблоке'
      },
      template: './src/example.html', 
      filename: 'example.html',
      chunks: ['production',  'all'],
      inject: true,
    }),  
                                       /*---------ПЛАСТИНЧАТЫЕ ТЕПЛООБМЕННИКИ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL,
      },
      title: 'Пластинчатые теплообменники, производство полного цикла, для горячего водоснабжения, отопления, пищевые',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/plastinchatye-teploobmenniki.html', 
      filename: 'plastinchatye-teploobmenniki.html',
      chunks: ['pto',  'all', 'map'],
    }),                                   /*---------ПИЩЕВЫЕ ТЕПЛООМБЕННИКИ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Пищевые теплообменники | Пластинчатые пастеризаторы и охладители | ООЛ | для молока, сусла и пищевых жидкостей',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/pishchevye-teploobmenniki.html', 
      filename: 'pishchevye-teploobmenniki.html',
      chunks: ['ptoFood',  'all', 'map'],
    }),                                   /*---------БЛОЧНЫЕ ТЕПЛОВЫЕ ПУНТЫ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Блочные тепловые пункты | Производство тепловых узлов, модулей итп заводской готовности',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/blochnye-teplovye-punkty.html', 
      filename: 'blochnye-teplovye-punkty.html',
      chunks: ['btp',  'all', 'map'],
    }),                                   /*---------ПАСТЕРИЗАЦИОННЫЕ УСТАНОВКИ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Изготовливаем пастеризационные охладительные установки | На базе теплообменников собственного производства',
      meta: {
        keywords: 'пастеризационные охладительные установки, установки поу', 
        description: 'Все о термоблоке'
      },
      template: './src/pou.html', 
      filename: 'pasterizatsionno-okhladitelnye-ustanovki.html',
      chunks: ['btp',  'all', 'map'],
    }),                                    /*---------СЕРВИС И ЗАПАСНЫЕ ЧАСТИ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Производство и поставка запасных частей на теплообменники Теплохит',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/service.html', 
      filename: 'service.html',
      chunks: ['service',  'all', 'map'],
    }),                                   /*---------О КОМПАНИИ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'О производстве пластинчатых теплообменников, этапы производства, испытания, реализуемая продукция',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/about.html', 
      filename: 'about.html',
      chunks: ['about',  'all', 'map'],
    }),                                   /*---------КОНТАКТЫ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Контакты ООО Термоблок',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/contacts.html', 
      filename: 'contacts.html',
      chunks: ['contacts',  'all', 'map'],
    }),                                  /*---------ПОДБОР И РАСЧЁТ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Подбор и расчет пластинчатых теплообменников онлайн',
      meta: {
        keywords: 'пластинчатый теплообменник подбор, расчет пластинчатого теплообменника онлайн', 
        description: 'Большой выбор пластинчатых теплообменников. Калькулятор с подбором пластинчатого теплообменника, полный расчет пластинчатого теплообменника онлайн'
      },
      template: './src/equipment-selection.html', 
      filename: 'equipment-selection/index.html',
      chunks: ['equipment', 'map'],
    }),                                   /*---------СЕКЦИЯ БЛОГА----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Новое в производстве пластинчатых теплообменников',
      meta: {
        keywords: 'российское производство теплообменников', 
        description: 'Все о термоблоке'
      },
      template: './src/blog-section.html', 
      filename: 'blog-proizvodstva/index.html',
      chunks: ['blogSection',  'all', 'map'],
    }),                                   /*---------СТРАНИЦЫ БЛОГА----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Пластинчатые теплообменники отопления',
      meta: {
        keywords: 'теплообменники отопления, пластинчатые теплообменники отопления', 
        description: 'Все о термоблоке'
      },
      article: ptoOtop,
      template: './src/blog-page-abstract.html', 
      filename: 'blog-proizvodstva/plastinchatye-teploobmenniki-otopleniya.html',
      chunks: ['blogPage',  'all', 'map'],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Пластинчатые теплообменники горячего водоснабжения ГВС',
      meta: {
        keywords: 'теплообменники гвс, пластинчатые теплообменники гвс', 
        description: 'Все о термоблоке'
      },
      article: ptoGvs,
      template: './src/blog-page-abstract.html', 
      filename: 'blog-proizvodstva/plastinchatye-teploobmenniki-gvs.html',
      chunks: ['blogPage',  'all', 'map'],
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Пластинчатые пастеризаторы',
      meta: {
        keywords: 'пастеризатор, пластинчатый пастеризатор', 
        description: 'Все о термоблоке'
      },
      article: ptoPasteriz,
      template: './src/blog-page-abstract.html', 
      filename: 'blog-proizvodstva/plastinchatyy-pasterizator.html',
      chunks: ['blogPage',  'all', 'map'],
    }),
                                       /*---------КАТАЛОГ----------- */
    new HtmlWebpackPlugin({
      templateParameters: {
        canonicalURL: canonicalURL,
      },
      title: 'Каталог пластинчатых теплообменников | Каталог Теплохит',
      meta: {
        keywords: 'каталог пластинчатых теплообменников, теплохит каталог', 
        description: 'Все о термоблоке'
      },
      template: './src/catalog.html', 
      filename: 'catalog/index.html',
      chunks: ['catalog',  'all', 'map'],
    }),
    /*---------------------ТЕПЛООБМЕННИКИ------------------------------------------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ025 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-025.html',
      templateParameters: {
        'tialias': 'ti025.png',
        'drawalias': 'draw025.jpg',
        'heading': 'ТИ 025',
        'description' : `ТИ025 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/Lo1bdjAoi7LVyQ',
      },
      chunks: ['ti', 'all'],
    }),                                  /*--2-------ТИ077----------- */
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ077 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-077.html',
      templateParameters: {
        'tialias': 'ti077.png',
        'drawalias': 'draw077.jpg',
        'heading': 'ТИ 077',
        'description' : `ТИ077 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/kEiGbHo7Fi8Uwg',
      },
      chunks: ['ti', 'all'],
    }),                                  /*---3------ТИ13----------- */
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ13 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-13.html',
      templateParameters: {
        'tialias': 'ti13.png',
        'drawalias': 'draw13.jpg',
        'heading': 'ТИ 13',
        'description' : `ТИ13 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/7C26Ov2CVbgl6w',
      },
      chunks: ['ti', 'all'],
    }),                                  /*--4-------ТИ18-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ18 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-18.html',
      templateParameters: {
        'tialias': 'ti18.png',
        'drawalias': 'draw18.jpg',
        'heading': 'ТИ 18',
        'description' : `ТИ18 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/O2lzhXAOWaA4ug',
      },
      chunks: ['ti', 'all'],
    }),                                  /*--5-------ТИ16,5-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ16,5 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-16-5.html',
      templateParameters: {
        'tialias': 'ti18.png',
        'drawalias': 'draw16-5.jpg',
        'heading': 'ТИ 16,5',
        'description' : `ТИ18 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': '',
      },
      chunks: ['ti', 'all'],
    }),                                  /*--6-------ТИ28-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ18 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-28.html',
      templateParameters: {
        'tialias': 'ti28.png',
        'drawalias': 'draw28.jpg',
        'heading': 'ТИ 28',
        'description' : `ТИ18 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                 /*--7-------ТИ45-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ18 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-45.html',
      templateParameters: {
        'tialias': 'ti45.png',
        'drawalias': 'draw45.jpg',
        'heading': 'ТИ 45',
        'description' : `ТИ45 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*--8-------ТИ52-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ52 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-52.html',
      templateParameters: {
        'tialias': 'ti52.png',
        'drawalias': 'draw52.jpg',
        'heading': 'ТИ 52',
        'description' : `ТИ52 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*--9-------ТИ65-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ65 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-65.html',
      templateParameters: {
        'tialias': 'ti65.png',
        'drawalias': 'draw52.jpg',
        'heading': 'ТИ 65',
        'description' : `ТИ45 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*-10-------ТИ82-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ82 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-82.html',
      templateParameters: {
        'tialias': 'ti82.png',
        'drawalias': 'draw82.jpg',
        'heading': 'ТИ 82',
        'description' : `ТИ82 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*-11-------ТИ95-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ65 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-95.html',
      templateParameters: {
        'tialias': 'ti95.png',
        'drawalias': 'draw95.jpg',
        'heading': 'ТИ 95',
        'description' : `ТИ95 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*-12-------ТИ116-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ116 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-116.html',
      templateParameters: {
        'tialias': 'ti95.png',
        'drawalias': 'draw116.jpg',
        'heading': 'ТИ 116',
        'description' : `ТИ116 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*ПИЩЕВЫЕ */
                                          /*-1-------П025-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П025 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-025.html',
      templateParameters: {
        'tialias': 'p025.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П025',
        'description' : `Теплообменник П025 пищевого назначения. Отличием от типового исполнения (ТИ 025) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-2-------П077-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П077 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-077.html',
      templateParameters: {
        'tialias': 'p077.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П077',
        'description' : `Теплообменник П077 пищевого назначения. Отличием от типового исполнения (ТИ 077) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-3-------П13-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П13 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-13.html',
      templateParameters: {
        'tialias': 'p13.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П13',
        'description' : `Теплообменник П13 пищевого назначения. Отличием от типового исполнения (ТИ 13) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-3-------П18-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П18 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-18.html',
      templateParameters: {
        'tialias': 'p18.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П18',
        'description' : `Теплообменник П18 пищевого назначения. Отличием от типового исполнения (ТИ 18) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-4-------П16,5-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П16,5 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-16-5.html',
      templateParameters: {
        'tialias': 'p18.png',    ///ЖДЕМ ФОТО
        'drawalias': 'draw116.jpg',
        'heading': 'П16,5',
        'description' : `Теплообменник П16,5 пищевого назначения. Отличием от типового исполнения (ТИ 16,5) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-5-------П28-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П28 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-28.html',
      templateParameters: {
        'tialias': 'p28.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П28',
        'description' : `Теплообменник П28 пищевого назначения. Отличием от типового исполнения (ТИ 28) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-6-------П45-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П45 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-45.html',
      templateParameters: {
        'tialias': 'p45.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П45',
        'description' : `Теплообменник П45 пищевого назначения. Отличием от типового исполнения (ТИ 45) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-7-------П52-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П52 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-52.html',
      templateParameters: {
        'tialias': 'p52.png',
        'heading': 'П52',
        'drawalias': 'draw116.jpg',
        'description' : `Теплообменник П52 пищевого назначения. Отличием от типового исполнения (ТИ 52) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                     /*-8-------П65-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник П65 пищевой пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/p-65.html',
      templateParameters: {
        'tialias': 'p65.png',
        'drawalias': 'draw116.jpg',
        'heading': 'П65',
        'description' : `Теплообменник П65 пищевого назначения. Отличием от типового исполнения (ТИ 65) на данный теплообменник устанавливаются пищевые штуцера и,
        по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),
    
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new SitemapPlugin({ base: canonicalURL, paths })
  ] 
}
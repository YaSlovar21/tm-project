const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 



module.exports = {
  entry: { 
    index: './src/pages/index.js',
    all: './src/pages/all.js',
    map: './src/pages/map.js',
    pto: './src/pages/pto.js',
    ti: './src/pages/ti.js',
    btp: './src/pages/btp.js',
    ptoFood: './src/pages/pto-food.js',
    production: './src/pages/production.js',
    service: './src/pages/service.js',
    about: './src/pages/about.js',
    contacts: './src/pages/contacts.js',
    blogSection: './src/pages/blog-section.js',
    blogPage: './src/pages/blog-page.js',
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
    port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

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
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
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
      title: 'gsfdgs',
      template: './src/index.html', // путь к файлу index.html
      chunks: ['index', 'all', 'map'],
    }),                                   /*---------ПРОДУКЦИЯ----------- */
    new HtmlWebpackPlugin({       
      title: 'Производство теплообменого оборудования, пластинчатых теплообменников, тепловых пунктов',
      template: './src/production.html', 
      filename: 'production.html',
      chunks: ['production', 'all'],
      inject: true,
    }),                                   /*---------ПЛАСТИНЧАТЫЕ ТЕПЛООБМЕННИКИ----------- */
    new HtmlWebpackPlugin({
      title: 'Пластинчатые теплообменники, производство полного цикла, для горячего водоснабжения, отопления, пищевые',
      template: './src/plastinchatye-teploobmenniki.html', 
      filename: 'plastinchatye-teploobmenniki.html',
      chunks: ['pto',  'all', 'map'],
    }),                                   /*---------ПИЩЕВЫЕ ТЕПЛООМБЕННИКИ----------- */
    new HtmlWebpackPlugin({
      title: 'Пищевые теплообменники | Пластинчатые пастеризаторы и охладители | ООЛ | для молока, сусла и пищевых жидкостей',
      template: './src/pishchevye-teploobmenniki.html', 
      filename: 'pishchevye-teploobmenniki.html',
      chunks: ['ptoFood',  'all', 'map'],
    }),                                   /*---------БЛОЧНЫЕ ТЕПЛОВЫЕ ПУНТЫ----------- */
    new HtmlWebpackPlugin({
      title: 'Блочные тепловые пункты | Производство тепловых узлов, модулей итп заводской готовности',
      template: './src/blochnye-teplovye-punkty.html', 
      filename: 'blochnye-teplovye-punkty.html',
      chunks: ['btp',  'all', 'map'],
    }),                                   /*---------СЕРВИС И ЗАПАСНЫЕ ЧАСТИ----------- */
    new HtmlWebpackPlugin({
      title: 'Производство и поставка запасных частей на теплообменники Теплохит',
      template: './src/service.html', 
      filename: 'service.html',
      chunks: ['service',  'all', 'map'],
    }),                                   /*---------О КОМПАНИИ----------- */
    new HtmlWebpackPlugin({
      title: 'О производстве пластинчатых теплообменников, этапы производства, испытания, реализуемая продукция',
      template: './src/about.html', 
      filename: 'about.html',
      chunks: ['about',  'all', 'map'],
    }),                                   /*---------КОНТАКТЫ----------- */
    new HtmlWebpackPlugin({
      title: 'Контакты ООО Термоблок',
      template: './src/contacts.html', 
      filename: 'contacts.html',
      chunks: ['contacts',  'all', 'map'],
    }),                                   /*---------СЕКЦИЯ БЛОГА----------- */
    new HtmlWebpackPlugin({
      title: 'Новое в производстве пластинчатых теплообменников',
      template: './src/blog-section.html', 
      filename: 'blog-proizvodstva/index.html',
      chunks: ['blogSection',  'all', 'map'],
    }),                                   /*---------СТРАНИЦЫ БЛОГА----------- */
    new HtmlWebpackPlugin({
      title: '1truty3',
      template: './src/blog-page.html', 
      filename: 'blog-proizvodstva/plastinchatye-teploobmenniki-otopleniya.html',
      chunks: ['blogPage',  'all', 'map'],
    }),
    
    /*---------------------ТЕПЛООБМЕННИКИ------------------------------------------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ025 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-025.html',
      templateParameters: {
        'tialias': 'ti077.png',
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
        'heading': 'ТИ 45',
        'description' : `ТИ45 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),                                    /*--8-------ТИ65-----------*/
    new HtmlWebpackPlugin({
      title: 'Теплообменник ТИ65 пластинчатый разборный',
      template: './src/ti-xx-xx.html', // шаблон
      filename: 'catalog/ti-65.html',
      templateParameters: {
        'tialias': 'ti65.png',
        'heading': 'ТИ 65',
        'description' : `ТИ45 – имеет широкую гамму подключения подтрубков: Ду20, Ду25, Ду32, Ду40. Конструкция пластины позволяет формировать 12
        разновидностей каналов для прохода различных жидкостей, что позволяет изменять гидравлическое сопротивление и теплопередачу,
        при этом сопротивление греющей и нагревающей жидкости может быть разное. Особая конструкция клипа надежно закрепляет уплотнение на
        пластину (рисунок 1,2), тем самым исключает обрыв при монтаже пластины.`,
        'link3d': 'https://disk.yandex.ru/d/3lo5g4MpzvYFcA',
      },
      chunks: ['ti', 'all'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ] 
}
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
    //ti: './src/pages/ti.js'
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
          loader: 'css-loader'
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // путь к файлу index.html
      chunks: ['index', 'all', 'map'],
    }),
    new HtmlWebpackPlugin({
      template: './src/plastinchatye-teploobmenniki.html', // путь к файлу index.html
      filename: 'plastinchatye-teploobmenniki/index.html',
      chunks: ['pto',  'all', 'map'],
    }),
    /*new HtmlWebpackPlugin({
      template: './src/ti-xx-xx.html', // путь к файлу index.html
      filename: 'catalog/ti-077.html',
      chunks: ['ti'],
    }),*/
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ] 
}
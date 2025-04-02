const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name].[hash][ext]', // Ukládání obrázků do složky images
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.less$/,  // Zpracování LESS souborů
        use: [
          MiniCssExtractPlugin.loader,  // Extrahuje CSS do samostatného souboru
          'css-loader',  // Zpracovává CSS
          'less-loader',  // Zpracovává LESS soubory
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // Zpracování obrázků
        type: 'asset/resource',  // Asset module pro obrázky (pro větší soubory)
        generator: {
          filename: 'images/[name].[hash][ext]',  // Ukládání obrázků s názvem a hash v dist/images/
        },
      },
      {
        test: /\.js$/,  // Zpracování JavaScript souborů
        exclude: /node_modules/,  // Ignorování node_modules
        use: {
          loader: 'babel-loader',  // Babel pro kompatibilitu s prohlížeči
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Vstupní HTML šablona
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',  // Výstupní CSS soubor
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // Složka pro statické soubory
    },
    port: 3000,  // Port pro dev server
    open: true,  // Automatické otevření prohlížeče
    hot: true,  // Hot reload
    historyApiFallback: true,  // Podpora pro SPA aplikace
  },
  watch: true,  // Sleduje změny v souborech
};

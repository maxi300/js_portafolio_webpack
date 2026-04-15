const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // Corregido el nombre a PascalCase
const Dotenv = require('dotenv-webpack'); // Agregado para manejar variables de entorno
const { watch } = require('fs');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js', // Añadido hash para caché
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[hash][ext][query]',
    clean: true, // Limpia la carpeta dist en cada build
  },
    mode: 'development',
    watch: true, // Habilita el modo de observación para desarrollo
  resolve: {
    extensions: ['.js', '.jsx'],
    
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@assets': path.resolve(__dirname, 'src/assets/')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css|\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      },
      {
        test: /\.png|\.svg|\.jpg|\.jpeg|\.gif$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]'
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images"),
          to: "assets/images",
          noErrorOnMissing: true // Evita errores si la carpeta está vacía
        }
      ]
    }),
    new Dotenv() // Agregado para cargar variables de entorno desde el archivo .env

  ],

}; // AQUÍ TERMINA EL ARCHIVO

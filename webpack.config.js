const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    cart_bundle: "./src/main.js",
    index_bundle: "./src/addToCart.js",
    weather_bundle: "./src/weather.jsx"
  },
  output: {
    path: path.join(__dirname, "/assets/js"),
    filename: "[name].js",
    library: '[name]'
  },
  devServer: {
    inline: true,
    port: 8001,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
        },
      },
      {
        test: /\.css$/i,
        loader: "css-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "cart.html",
    }),
  ],
};

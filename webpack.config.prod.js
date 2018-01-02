const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require(path.resolve(
  process.cwd(),
  "node_modules",
  "offline-plugin"
));

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["react-hot-loader/webpack", "babel-loader"]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader"
              },
              {
                loader: "postcss-loader",
                options: {
                  plugins: () => [require("autoprefixer")]
                }
              },
              {
                loader: "sass-loader"
              }
            ],
            // use style-loader in development
            fallback: "style-loader"
          })
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: process.env.APP_TITLE,
      template: path.resolve(__dirname, "templates/index.html")
    }),
    // build optimization plugins
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css",
      disable: process.env.NODE_ENV === "development"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor-[chunkhash].min.js",
      minChunks: function(module) {
        return module.context && module.context.includes("node_modules");
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new OfflinePlugin()
  ],
  output: {
    filename: "[name].[chunkhash]-bundle.min.js",
    path: path.resolve(__dirname, "dist")
  }
};

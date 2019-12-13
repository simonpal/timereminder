const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = [
  {
    mode: "development",
    entry: "./src/electron.ts",
    target: "electron-main",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["ts-loader"],
          include: path.join(__dirname, "src")
        }
      ]
    },
    output: {
      path: __dirname + "/dist",
      filename: "electron.js"
    }
  },
  {
    mode: "development",
    entry: "./src/index.tsx",
    target: "electron-renderer",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ["ts-loader"],
          include: path.join(__dirname, "src")
        },
        {
          test: /\.ttf$/,
          use: [
            {
              loader: "ttf-loader",
              options: {
                name: "./assets/font/[hash].[ext]"
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/i,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 8192
                  }
              }
          ]
      }
      ]
    },
    output: {
      path: __dirname + "/dist",
      filename: "index.js"
    },
    resolve: {
      extensions: [".ts", ".js", ".json", ".tsx"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
    ]
  }
];

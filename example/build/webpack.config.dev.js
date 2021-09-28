const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const portfinder = require('portfinder');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devWebpackConfig = {
  mode: 'development',
  entry: {
      app: path.resolve(__dirname, '../main.js')
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: false,
    historyApiFallback: false,
    hot: true,
    quiet: true,
    // 出现错误时，在浏览器中显示全屏覆盖层
    overlay: {
      warnings: false,
      errors: true,
    },
    host: '0.0.0.0',
    port: '8081',
  },
  module: {
   
  },
  plugins: [
    //启用热替换模块(Hot Module Replacement)，也被称为 HMR。
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../scale.html')
    })
  ],
};

module.exports = new Promise((reslove, reject) => {
//   portfinder.basePort = config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
    } else {
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `您的应用运行成功: http://0.0.0.0:8081`,
            ],
          },
        })
      );
    }

    reslove(devWebpackConfig);
  });
});
module.exports = {
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            }
        ],
    }
    // configureWebpack: {
    //   plugins: [
    //     new MyAwesomeWebpackPlugin()
    //   ]
    // }
  }
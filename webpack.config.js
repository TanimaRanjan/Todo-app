// Accessing the path library using require(path)
const path = require('path') 


module.exports = {
    entry: ['babel-polyfill', './src/index.js'], 
    output: {
        // The path should be absolute path. 
        path: path.resolve(__dirname, 'public/scripts'), 
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/, 

                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['env', 'react']
                    }
                }
            }, 
            {
                test: /\.css$/, 
                use: ["style-loader", "css-loader"]
            }
    ]
    },
    devServer: {
        // Absolute path that lets devserver know where folder that you are trying to server up lives
        contentBase: path.resolve(__dirname, 'public'),
        // Where the assets are
        publicPath: '/scripts/'
    },
    devtool:'source-map'
}
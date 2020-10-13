const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/i,
                exclude: [/node_modules/, /public/],
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
};
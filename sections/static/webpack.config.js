module.exports = {
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
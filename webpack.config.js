const path = require ( 'path' );
const webpack = require ( 'webpack' );

module.exports = function() {
    return {
    	devtool: 'source-map',
        entry: {
            'app': './public/src/app-chunk.js',
            'vendor' : './public/src/vendor-chunk.js',
            'css' : './public/src/css-chunk.js',
            'angular' : './public/src/angular-chunk.js'
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].bundle.js',
            publicPath: '',
            devtoolLineToLine: true,
            sourceMapFilename: '[name].bundle.map'
        },
        resolve: {
            extensions: ['.js', '.json'],
            modules: [path.join(__dirname, 'src'), 'node_modules']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ['css-loader']
                },
                {
                    test: /\.(css|html|jpg|png|gif)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                }
            ],
        },
        plugins: [],
    };
}
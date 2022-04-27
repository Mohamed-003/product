const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: path.resolve(__dirname, './src/index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|xml)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.xml/,
				type: 'asset/resource',
				generator: {
					filename: 'sitemap.xml',
				},
			},
			{
				test: /\.txt/,
				type: 'asset/resource',
				generator: {
					filename: 'robots.txt',
				},
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	devtool:
		process.env.NODE_ENV === 'production'
			? 'source-map'
			: 'cheap-module-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/index.html'),
			favicon: './public/favicon.ico',
			filename: 'index.html',
		}),
		new Dotenv({
			path: './src/.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false, // load '.env.defaults' as the default values if empty.
		}),
	],
};

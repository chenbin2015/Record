module.exports={
	entry:'./demo.js',
	output:{
		filename:'index.js',
		path:'./dist'
	},
  module: {
     loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader'
	    }
	  ]
  }
}
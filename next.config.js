const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [
        path.join(__dirname, 'styles'),
        path.join(__dirname, 'src'),
        path.join(__dirname, 'pages')
    ],
  },
}
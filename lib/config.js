const config = require('../config.json')

const defaultConfig = {
  port: 8000,
  baseUrl: 'http://localhost:8000',
  wikiUrl: 'https://vanhack.ca/doku.php'
}

module.exports = Object.assign({}, defaultConfig, config)

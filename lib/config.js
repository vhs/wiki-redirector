const config = require('../config.json')

const defaultConfig = {
    port: 8000,
    baseUrl: 'http://localhost:8000',
    wikiUrl: 'https://vanhack.ca/doku.php',
    qrCodeOptions: { size: 500, scale: 25, qzone: 5 }
}

module.exports = { ...defaultConfig, ...config }

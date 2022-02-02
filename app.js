const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { check } = require('express-validator')

const QRCode = require('qrcode')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('views', './views')
app.set('view engine', 'ejs')

const config = require('./lib/config')

app.get('/', function (req, res) {
  res.redirect(config.wikiUrl)
})

app.get(
  '/:page',
  [check('page').isString().trim().escape()],
  function (req, res) {
    const { page } = req.params

    if (page !== undefined && typeof page === 'string') {
      res.redirect(config.wikiUrl + '?id=' + page)
    } else { res.json({ result: 'ERROR', message: 'Missing or invalid page' }) }
  }
)

app.get(
  '/:page/qr',
  [check('page').isString().trim().escape()],
  function (req, res) {
    const { page } = req.params

    const { baseUrl, wikiUrl } = config

    if (page !== undefined && typeof page === 'string') {
      QRCode.toDataURL(
        wikiUrl + '?id=' + page,
        { size: 500, scale: 25, qzone: 5 },
        function (err, qrImgData) {
          if (err) {
            console.log('error: ' + err)
            res.json({
              result: 'ERROR',
              message: 'Error while generating QR code'
            })
          }

          res.render('qrinfo', { baseUrl, wikiUrl, page, qrImgData })
        }
      )
    } else { res.json({ result: 'ERROR', message: 'Missing or invalid page' }) }
  }
)

module.exports = app

const express = require('express')
const path = require('path')
const next = require('next')
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./i18n')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    preload: ['en-US', 'ja-JP'], // preload all langages
    ns: ['common'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        const robotsOptions = {
        root: __dirname + '/static/',
          headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
          }
        };

        server.get('/robots.txt', (req, res) => (
          res.status(200).sendFile('robots.txt', robotsOptions)
        ));

        // mercari tech conf 2017
        server.use('/2017', express.static(path.join(__dirname+'/static/2017')));

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n))

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')))
        // FIXME: fix request to /locales/{ja,en} to /locales/{ja-JP, en-US}
        server.use('/locales/ja', express.static(path.join(__dirname, '/locales/ja-JP')))
        server.use('/locales/en', express.static(path.join(__dirname, '/locales/en-US')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

        // redirect root access to /2018
        // server.get('/', (req, res) => res.redirect('/2018'))

        // use next.js
        // server.get('*', (req, res) => handle(req, res))
        server.use(handler)

        server.listen(8080, (err) => {
          if (err) {
            throw err
          }
          console.log('> Ready on http://localhost:8080')
        })
      })
  })

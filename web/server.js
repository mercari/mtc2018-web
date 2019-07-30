const express = require('express')
const path = require('path')
const next = require('next')
const i18nextMiddleware = require('i18next-express-middleware')
const nextI18NextMiddleware = require('next-i18next/middleware').default
const nextI18next = require('./i18n')

const port = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
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

  // static resources
  server.use('/2018/static', express.static(path.join(__dirname+'/static/2018')));

  // enable middleware for i18next
  server.use(nextI18NextMiddleware(nextI18next))

  // serve locales for client
  server.use('/locales', express.static(path.join(__dirname, '/locales')))
  // FIXME: fix request to /locales/{ja,en} to /locales/{ja-JP, en-US}
  server.use('/locales/ja', express.static(path.join(__dirname, '/locales/ja-JP')))
  server.use('/locales/en', express.static(path.join(__dirname, '/locales/en-US')))

  // missing keys
  server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(nextI18next))

  // redirect root access to /2018
  // server.get('/', (req, res) => res.redirect('/2018'))

  // use next.js
  // server.get('*', (req, res) => handle(req, res))

  // TODO
  // module.exports = routes()
  //  .add('/2018/session/:id', '/2018/session/detail');
  server.use(handle)

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line no-console
})()

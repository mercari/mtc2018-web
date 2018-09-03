const routes = require('next-routes')

module.exports = routes()
  .add('/2018/session/:id', '/2018/session/detail');

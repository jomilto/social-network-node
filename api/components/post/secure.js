const auth = require('../../../auth');
const controller = require('./index');

module.exports = function checkAuth(action) {
  async function middleware(req, res, next) {
    let owner;
    let record;
    switch (action) {
      case "mine":
      case "create":
        auth.check.logged(req);
        break;
      case "update":
        record = await controller.get(req.body.id);
        owner = record.author;
        auth.check.own(req, owner);
        break;
      case "remove":
          record = await controller.get(req.body.id);
          owner = record.author;
          auth.check.own(req, owner);
          break;
    }
    next();
  }

  return middleware;
}
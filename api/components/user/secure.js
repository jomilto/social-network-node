const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    let owner;
    switch (action) {
      case "update":
        owner = req.body.id;
        auth.check.own(req, owner);
        break;
      case "remove":
          owner = req.body.id;
          auth.check.own(req, owner);
          break;
      case "follow":
        auth.check.logged(req);
        break;
    }
    next();
  }

  return middleware;
}
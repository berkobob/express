"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
var router = (0, express_1.Router)();
exports.router = router;
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n            <div>\n            <div>You are logged in</div>\n            <a href=\"/logout\">Logout</a>\n            </div>\n            ");
    }
    else {
        res.send("\n            <div>\n            <div>You are not logged in</div>\n            <a href=\"/login\">Login</a>\n            </div>\n            ");
    }
});
router.get('/logout', function (req, res) {
    req.session = null;
    res.redirect('/');
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome to protected route, logged in user!');
});
//# sourceMappingURL=loginRoutes.js.map
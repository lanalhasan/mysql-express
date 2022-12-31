var express = require('express');
var router = express.Router();
const controllers = require("../controllers/userController")
const { isAuth } = require('../middlewares')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users page');
});
router.post('/signup' , controllers.signUp)
router.post('/signin' , controllers.signin)
router.post('/update' , isAuth , controllers.update)


module.exports = router;
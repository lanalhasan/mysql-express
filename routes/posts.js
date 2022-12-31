var express = require('express');
var router = express.Router();
const controllers = require("../controllers/postController");
const { isAuth } = require('../middlewares');


router.get('/' ,isAuth, controllers.allPosts)
router.post('/createpost' ,isAuth, controllers.createPost)
router.get('/singlepost/:id' ,isAuth, controllers.getSinglePost)
router.post('/deletepost/:id' ,isAuth, controllers.deletePost)
router.post('/editpost/:id' ,isAuth, controllers.editPost)



module.exports = router;
const router = require('express').Router();
const userController = require('../controller/userController');

router.get('', userController.welcome_page);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
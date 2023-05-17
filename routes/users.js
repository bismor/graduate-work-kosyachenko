const router = require('express').Router();
const { getUsers, changeUsers } = require('../controllers/users');

router.get('/me', getUsers);
router.patch('/me', changeUsers);

module.exports = router;

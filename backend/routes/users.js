const router = require('express').Router();
const { getUsers, changeUsers } = require('../controllers/users');
const { validateChangeUser } = require('../middlewares/requestValidation');

router.get('/me', getUsers);
router.patch('/me', validateChangeUser, changeUsers);

module.exports = router;

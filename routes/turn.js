
const {Router} = require('express');

const controller = require('../controllers/turn');

const router = Router();


router.post(
    '/api/postTurn',
    controller.postTurn
);

router.get(
    '/api/getTurns',
    controller.getTurns
);
module.exports = router;
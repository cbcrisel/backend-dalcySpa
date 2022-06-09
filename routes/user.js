const {Router}= require('express');
const { postUserE,postUserC, login } = require('../controllers/user');

const router= Router();

router.post('/api/postUserE',postUserE);
router.post('/api/postUserC',postUserC);
router.post('/api/login',login);

module.exports=router;
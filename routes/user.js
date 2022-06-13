const {Router}= require('express');
const { postUserE,postUserC, login, getEsteticistas } = require('../controllers/user');

const router= Router();

router.post('/api/postUserE',postUserE);
router.post('/api/postUserC',postUserC);
router.post('/api/login',login);
router.get('/api/getEsteticistas',getEsteticistas);

module.exports=router;
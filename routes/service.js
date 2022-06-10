const {Router}= require('express');
const { getTurnsOfAService } = require('../controllers/service');


const router= Router();

router.get('/api/turnsOfService/:id_servicio',getTurnsOfAService);

module.exports=router;
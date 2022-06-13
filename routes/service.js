const {Router}= require('express');
const { getTurnsOfAService, postService, getServicesByCategory } = require('../controllers/service');


const router= Router();

router.get('/api/turnsOfService/:id_servicio',getTurnsOfAService);
router.post('/api/postService',postService);
router.post('/api/getServicesByCategory',getServicesByCategory);

module.exports=router;
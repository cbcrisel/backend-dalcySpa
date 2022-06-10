const {Router}= require('express');
const { getTurnsOfAService, postService } = require('../controllers/service');


const router= Router();

router.get('/api/turnsOfService/:id_servicio',getTurnsOfAService);
router.post('/api/postService',postService);
module.exports=router;
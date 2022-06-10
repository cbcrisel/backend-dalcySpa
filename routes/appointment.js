const {Router}= require('express');
const { postAppointment } = require('../controllers/appointment');
const { validateJWT } = require('../helpers/jwt');

const router= Router();

router.post('/api/appointment',validateJWT,postAppointment);

module.exports=router;
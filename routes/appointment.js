const {Router}= require('express');
const { postAppointment, getAppointmentsOfAnUser } = require('../controllers/appointment');
const { validateJWT } = require('../helpers/jwt');

const router= Router();

router.post('/api/appointment',validateJWT,postAppointment);
router.get('/api/appointmentsByUser',validateJWT,getAppointmentsOfAnUser);

module.exports=router;
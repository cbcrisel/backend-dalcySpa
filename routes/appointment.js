const {Router}= require('express');
const { postAppointment, getAppointmentsOfAnUser, getAppointmentsOfAnEsteticista } = require('../controllers/appointment');
const { validateJWT } = require('../helpers/jwt');

const router= Router();

router.post('/api/appointment',validateJWT,postAppointment);
router.get('/api/appointmentsByUser',validateJWT,getAppointmentsOfAnUser);
router.get('/api/appointmentsByEsteticista',validateJWT,getAppointmentsOfAnEsteticista)

module.exports=router;
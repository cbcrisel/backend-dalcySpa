const {Router}= require('express');
const { postObservation, getObservationByAppointment } = require('../controllers/observation');

const { validateJWT } = require('../helpers/jwt');

const router= Router();

router.post('/api/observation',validateJWT,postObservation),
router.get('/api/observations/:id_cita',validateJWT,getObservationByAppointment)

module.exports=router;
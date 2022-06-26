const {Router}= require('express');
const { postObservation } = require('../controllers/observation');

const { validateJWT } = require('../helpers/jwt');

const router= Router();

router.post('/api/observation',validateJWT,postObservation)

module.exports=router;
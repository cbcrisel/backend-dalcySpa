const {Router} = require('express');

const controller = require('../controllers/category');
const { route } = require('./user');

const router = Router();

router.post(
    '/api/postCategory',
    controller.postCategory
);

router.get(
    '/api/getCategories',
    controller.getCateogies
);

module.exports=router;
const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

const {
    createProvince,
    readProvince,
    // updateCategory,
    // deleteCategory
} = require('../controllers/province')

Route
    .post('/', createProvince)
<<<<<<< HEAD
    .get('/')
    .get('/:provinceName')
    .patch('/:provinceId')
    .delete('/:provinceId')
=======
    .get('/', readProvince)
    .patch('/:provinceId', )
    .delete('/:provinceId',)
>>>>>>> province

module.exports = Route
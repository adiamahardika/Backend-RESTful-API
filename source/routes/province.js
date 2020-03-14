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
    .get('/', readProvince)
    .patch('/:provinceId', )
    .delete('/:provinceId',)

module.exports = Route
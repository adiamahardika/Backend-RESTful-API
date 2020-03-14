const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

const {
    createProvince,
    readProvince,
    updateProvince,
    // deleteCategory
} = require('../controllers/province')

Route
    .post('/', createProvince)
    .get('/', readProvince)
    .patch('/:provinceId', updateProvince)
    .delete('/:provinceId',)

module.exports = Route
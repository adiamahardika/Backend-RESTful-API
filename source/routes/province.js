const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    createProvince,
    readProvince,
    updateProvince,
    deleteProvince
} = require('../controllers/province')

Route
    .post('/', createProvince)
    .get('/', readProvince)
    .patch('/:provinceId', updateProvince)
    .delete('/:provinceId', deleteProvince)

module.exports = Route
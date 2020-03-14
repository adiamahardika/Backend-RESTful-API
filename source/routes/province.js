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
    .post('/', authentication, authorization, createProvince)
    .get('/', authentication, authorization, readProvince)
    .patch('/:provinceId', authentication, authorization, updateProvince)
    .delete('/:provinceId', authentication, authorization, deleteProvince)

module.exports = Route
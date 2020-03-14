const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

const {
    createProvince,
    // readCategory,
    // updateCategory,
    // deleteCategory
} = require('../controllers/province')

Route
    .post('/', createProvince)
    .get('/')
    .get('/:provinceName')
    .patch('/:provinceId')
    .delete('/:provinceId')

module.exports = Route
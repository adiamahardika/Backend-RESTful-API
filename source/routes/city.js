const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    createCity,
    readCity,
    updateCity,
    deleteCity
} = require('../controllers/city')

Route
    .post('/', authentication, authorization, createCity)
    .get('/', authentication, authorization, readCity)
    .patch('/:cityId', authentication, authorization, updateCity)
    .delete('/:cityId', authentication, authorization, deleteCity)

module.exports = Route
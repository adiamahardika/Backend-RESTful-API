const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

const {
    createCity,
    readCity,
    // updateCity,
    // deleteCity
} = require('../controllers/city')

Route
    .post('/', createCity)
    .get('/', readCity)
// .get('/:cityId', updateCity)
// .patch('/:cityId', updateCity)
// .delete('/:cityId', deleteCity)

module.exports = Route
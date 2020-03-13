const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

// const {
//     createCategory,
//     readCategory,
//     updateCategory,
//     deleteCategory,
//     ignoreFavicon
// } = require('../controllers/category')

Route
    .post('/')
    .get('/')
    .get('/:categoryName')
    .patch('/:categoryId')
    .delete('/:categoryId')

module.exports = Route
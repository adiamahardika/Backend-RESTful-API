const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

const {
    createCategory,
    readCategory,
    updateCategory,
//     deleteCategory,
//     ignoreFavicon
} = require('../controllers/category')

Route
    .post('/', createCategory)
    .get('/', readCategory)
    .get('/:categoryName', readCategory)
    .patch('/:categoryId', updateCategory)
    .delete('/:categoryId')

module.exports = Route
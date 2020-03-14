const express = require("express");
const Route = express.Router();

const { authentication, authorization } = require("../helpers/auth");

const {
    createProduct,
    readProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");

const { uploadImages } = require("../controllers/upload");

Route
    .post("/", authentication, authorization, uploadImages, createProduct)
    .get("/", authentication, authorization, readProduct)
    .get("/:productId", authentication, authorization, readProduct)
    .patch("/:productId", authentication, authorization, uploadImages, updateProduct)
    .delete("/:productId", authentication, authorization, deleteProduct)

module.exports = Route;

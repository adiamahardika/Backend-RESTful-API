const express = require("express");
const Route = express.Router();

// const { authentication, authorization } = require("../helpers/auth");

const {
    createProduct,
    readProduct,
    updateProduct,
    //  deleteProduct,
    //  ignoreFavicon
} = require("../controllers/product");

const { uploadImages } = require("../controllers/upload");

Route
    .post("/", uploadImages, createProduct)
    .get("/", readProduct)
    .get("/:productId")
    .patch("/:productId", uploadImages, updateProduct)
    .delete("/:productId")

module.exports = Route;

const express = require("express");
const Route = express.Router();

// const { authentication, authorization } = require("../helpers/auth");

const {
    createProduct,
    //  readProduct,
    //  updateProduct,
    //  deleteProduct,
    //  ignoreFavicon
} = require("../controllers/product");

const { uploadImages } = require("../controllers/upload");

Route
    .post("/", uploadImages, createProduct)
    .get("/")
    .get("/:productId")
    .patch("/:productId")
    .delete("/:productId")

module.exports = Route;

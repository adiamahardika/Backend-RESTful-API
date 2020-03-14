const express = require("express");
const Route = express.Router();

// const { authentication, authorization } = require("../helpers/auth");

const {
    createSubcity,
    readSubcity,
    updateSubcity,
    deleteSubcity
} = require("../controllers/sub_city");

Route
    .post("/", createSubcity)
    .get("/", readSubcity)
    .patch("/:subcityId", updateSubcity)
    .delete("/:subcityId", deleteSubcity)

module.exports = Route;

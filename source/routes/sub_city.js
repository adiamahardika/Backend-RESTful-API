const express = require("express");
const Route = express.Router();

const { authentication, authorization } = require("../helpers/auth");

const {
    createSubcity,
    readSubcity,
    updateSubcity,
    deleteSubcity
} = require("../controllers/sub_city");

Route
    .post("/", authentication, authorization, createSubcity)
    .get("/", authentication, authorization, readSubcity)
    .patch("/:subcityId", authentication, authorization, updateSubcity)
    .delete("/:subcityId", authentication, authorization, deleteSubcity)

module.exports = Route;

const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/dashboard.controller.js");

router.get("/", controller.information);

module.exports = router;

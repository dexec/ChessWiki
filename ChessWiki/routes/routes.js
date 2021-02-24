const express = require("express");
const router = express.Router();
const positions = require("../models/positions");

router.get("/", function(req,res) {
    res.render("choose");
})

router.get("/listpositions", function (req, res) {
    res.render("listpositions", {positions: positions})
});

router.get("/listofopenings", function (req, res) {
    res.render("listofopenings");
})

module.exports = router;
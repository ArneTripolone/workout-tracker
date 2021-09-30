//const express = require("express");
const path = require("path");
const router = require("express").Router();

//display homepage
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router
//const express = require("express");
const path = require("path");
const router = require("express").Router();

//Homepage
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

//Exercise
router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//Stats
router.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router


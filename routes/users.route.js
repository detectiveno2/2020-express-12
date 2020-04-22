const express = require("express");

const controller = require("../controllers/users.controller");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.postCreate);

router.get("/edit/:id", controller.edit);

router.post("/edit", controller.postEdit);

router.get("/delete/:id", controller.delete);

module.exports = router;

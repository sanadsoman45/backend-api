const express = require("express");
const { uploadImage } = require("../controllers/imageController");

const imagesRouter = express.Router();

imagesRouter.post("/upload-image", uploadImage); // Upload image to server

module.exports = imagesRouter;

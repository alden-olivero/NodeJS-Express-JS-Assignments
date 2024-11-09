const express = require("express");
const urlController = require("../controllers/urlController");
const router = express.Router();

router.route("/")
    .post(urlController.createShortUrl)
    .get(urlController.getAllUrls)

router.route("/:shortUrlCode")
    .get(urlController.getUrlByShortCode)
    .put(urlController.updateUrl)
    .delete(urlController.deleteUrl)

router.route("/redirect/:shortUrlCode")
    .get(urlController.redirect)

module.exports = router;
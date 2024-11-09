const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, "Original URL is required"]
    },
    shortUrl: {
        type: String,
        required: true
    },
    shortUrlCode: {
        type: String,
        unique: true,
        required: true
    }
});

const UrlModel = mongoose.model("UrlModel", urlSchema);
module.exports = UrlModel;

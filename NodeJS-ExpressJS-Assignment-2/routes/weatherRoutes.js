const express = require("express");
const weatherHandlers = require("../handlers/weatherHandler");
const router = express.Router();

router.route("/")
    .get(weatherHandlers.showAllDetails)
    .post(weatherHandlers.addCityWeather);

router.route("/rain")
    .get(weatherHandlers.showRainDetails);

router.route("/:cityName")
  .get(weatherHandlers.showDetailOfSpecificCity)
  .delete(weatherHandlers.removeCity)
  .put(weatherHandlers.changeRainDetails)

module.exports = router;

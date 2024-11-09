const express = require("express");
const urlRouter = require("./routes/urlRoutes");
const errorHandler = require("./controllers/errorController");
const ApiError = require("./utils/ApiError");

const app = express();
app.use(express.json());


app.use("/api/v1/urls", urlRouter);


app.all('*', (req, res, next) => {
    next(new ApiError(404, `${req.originalUrl} is not found`));
});


app.use(errorHandler.errorMiddleware);

module.exports = app;

const express=require("express");
const weatherRouter=require("./routes/weatherRoutes");

const app = express();
app.use(express.json());

// Middleware to log request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Weather routes
app.use("/api/v1/weather", weatherRouter);
module.exports=app;

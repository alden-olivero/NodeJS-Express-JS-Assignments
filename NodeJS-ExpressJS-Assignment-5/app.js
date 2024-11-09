const express = require("express");
const path=require("path")
const employeeRouter=require("./routes/employeeRoutes")
const webEmployeeRouter=require("./routes/empRoutes");
const errorHandler = require("./controllers/errorController");
const ApiError = require("./utils/ApiError");

const app = express();
//set new engine
app.set("view engine","ejs")
//app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/api/v1/employees/",employeeRouter)
app.use("/web/employees",webEmployeeRouter)



// app.all('*', (req, res, next) => {
//     res.status(404).json({
//         status: "failed",
//         message: `${req.originalUrl} is not found. Please check again`
//     });
// });

// Middleware for handling 404 errors
// app.all('*', (req, res, next) => {
//     const error = new Error(`${req.originalUrl} is not found. Please check again`);
//     error.statusCode = 404;
//     error.status = "failed";
//     next(error);
// });

app.all('*', (req, res, next) => {
    
    next(new ApiError(404,`${req.originalUrl} is not found`))
});

app.use(errorHandler.errorMiddleware)

module.exports=app
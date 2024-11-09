const express = require("express");
const employeeController=require("../controllers/employeeController")
const router = express.Router();



router.route("/")

    .post(employeeController.addNewEmployee)
    .get(employeeController.getAllEmployees)
router.route("/:id")
     .get(employeeController.getEmployee)
     .patch(employeeController.updateEmployee)
     .delete(employeeController.removeEmployee)
// router.route("/:id")
//     .get(employeeHandler.getEmployee)
//     .delete(employeeHandler.removeEmployee);
router.route("")


module.exports=router
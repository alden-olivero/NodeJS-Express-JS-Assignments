const empModel = require("./../models/employeeModel");
const ApiError = require("./../utils/ApiError");
const employeeLogger = require("./../utils/logger");

exports.addNewEmployee = async (req, res) => {
    try {
        const newEmployee = await empModel.create(req.body);
        employeeLogger.info("New employee added successfully", { employeeId: newEmployee._id });
        res.status(200).json({
            status: "Success",
            msg: "Data added successfully",
            data: {
                employee: newEmployee
            }
        });
    } catch (err) {
        employeeLogger.error("Employee registration failed", { error: err.message });
        res.status(400).json({
            status: "Failed",
            msg: "Employee Registration Failed"
        });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await empModel.find();
        employeeLogger.info("Fetched all employees", { count: employees.length });
        res.status(200).json({
            status: "Success",
            results: employees.length,
            data: {
                employeeDetails: employees
            }
        });
    } catch (err) {
        employeeLogger.error("Failed to fetch employees", { error: err.message });
        res.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
};

exports.getEmployee = async (req, res, next) => {
    try {
        const emp = await empModel.findById(req.params.id);
        if (!emp) throw new ApiError(404, "Employee not found");
        employeeLogger.info("Fetched employee", { employeeId: emp._id });
        res.status(200).json({
            status: "Success",
            data: {
                employeeDetails: emp
            }
        });
    } catch (err) {
        employeeLogger.error("Failed to fetch employee", { error: err.message, id: req.params.id });
        next(new ApiError(404, `${req.originalUrl} is not found. Please check again`));
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const emp = await empModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        employeeLogger.info("Employee updated", { employeeId: emp._id });
        res.status(200).json({
            status: "Success",
            data: {
                employeeDetails: emp
            }
        });
    } catch (err) {
        employeeLogger.error("Failed to update employee", { error: err.message, id: req.params.id });
        res.status(404).json({
            status: "Failed to update",
            message: err.message
        });
    }
};

exports.removeEmployee = async (req, res) => {
    try {
        await empModel.findByIdAndDelete(req.params.id);
        employeeLogger.info("Employee removed", { employeeId: req.params.id });
        res.status(200).json({
            status: "Success",
            data: null
        });
    } catch (err) {
        employeeLogger.error("Failed to remove employee", { error: err.message, id: req.params.id });
        res.status(404).json({
            status: "Fail",
            message: err.message,
            details: "Please check employee ID"
        });
    }
};

exports.getAllEmployeeDetails = async (req, res) => {
    try {
        const allEmployees = await empModel.find();
        employeeLogger.info("Fetched all employee details for rendering");
        return res.render("employees", {
            allEmployeesDetails: allEmployees
        });
    } catch (err) {
        employeeLogger.error("Failed to fetch employee details for rendering", { error: err.message });
        res.status(500).send("Error loading employee details");
    }
};

exports.addNewUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const newEmployee = await empModel.create({
            eid: req.body.empid * 1,
            first_name: req.body.efn,
            last_name: req.body.eln,
           
            email: req.body.email
        });

        console.log(newEmployee);
        if(newEmployee!=null){
        return res.render("login");
        }

    } catch (err) {
        next(new ApiError(404, `${err} is not found. Failed to update.`));
    }
};
exports.showSignUp=async(req,res)=>{
   return res.render("signup")
}


exports.removeUser=async(req,res,next)=>{
    console.log(req.query.eid)
    try{
     
    const remove = await empModel.findByIdAndDelete(req.query.eid)
    //const allEmployees = await empModel.find()
    const allEmployees = await empModel.find()
    return res.render("employees",{
       allEmployeesDetails:allEmployees
     })
    }
    catch(err)
      {
        
        next(new ApiError(404,`${err} is not found. Failed to delete`))
      }
  
  }

exports.showUpdateUserForm = async (req, res, next) => {
    try {
      const emp = await empModel.findById(req.query.eid);
      if (!emp) throw new ApiError(404, "Employee not found");
      return res.render("update", { employee: emp });
    } catch (err) {
      employeeLogger.error("Failed to fetch employee for update", { error: err.message, id: req.query.eid });
      next(new ApiError(404, `Employee not found. Please check the ID.`));
    }
  };
  
exports.updateUser = async (req, res, next) => {
    try {
      const updatedEmployee = await empModel.findByIdAndUpdate(req.body.eid, {
        first_name: req.body.efn,
        last_name: req.body.eln,
        email: req.body.email
      }, { new: true, runValidators: true });
  
      employeeLogger.info("Employee updated successfully", { employeeId: updatedEmployee._id });
      const allEmployees = await empModel.find();
      return res.render("employees", { allEmployeesDetails: allEmployees });
    } catch (err) {
      employeeLogger.error("Failed to update employee", { error: err.message, id: req.body.eid });
      next(new ApiError(404, `Update failed. Please try again.`));
    }
  };
  
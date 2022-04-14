import express from "express";
import controller from "../controllers/Employee.controller";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post(
  "/",
  ValidateSchema(Schemas.employee.create),
  controller.createEmployee
);
router.get("/", controller.readAllEmployees);
router.get("/:employeeId", controller.readEmployee);
router.put(
  "/:employeeId",
  ValidateSchema(Schemas.employee.update),
  controller.updateEmployee
);
router.delete("/:employeeId", controller.deleteEmployee);

export = router;

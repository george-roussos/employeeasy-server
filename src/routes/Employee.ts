import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

import controller from "../controllers/Employee.controller";
import express from "express";

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

import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

import controller from "../controllers/Vacation.controller";
import express from "express";

const router = express.Router();

router.post(
  "/",
  ValidateSchema(Schemas.vacation.create),
  controller.createVacation
);
router.get("/", controller.readAllVacations);
router.get("/:vacationId", controller.readVacation);
router.put(
  "/:vacationId",
  ValidateSchema(Schemas.vacation.update),
  controller.updateVacation
);
router.delete("/:vacationId", controller.deleteVacation);

export = router;

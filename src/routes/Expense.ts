import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

import controller from "../controllers/Expense.controller";
import express from "express";

const router = express.Router();

router.post(
  "/",
  ValidateSchema(Schemas.expense.create),
  controller.createExpense
);
router.get("/", controller.readAllExpenses);
router.get("/:expenseId", controller.readExpense);
router.put(
  "/:expenseId",
  ValidateSchema(Schemas.expense.update),
  controller.updateExpense
);
router.delete("/:expenseId", controller.deleteExpense);

export = router;

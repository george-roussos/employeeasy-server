import express from "express";
import controller from "../controllers/User.controller";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post(
  "/",
  ValidateSchema(Schemas.user.create),
  controller.createUser
);
router.get("/", controller.readAllUsers);
router.get("/:userId", controller.readUser);
router.put(
  "/:userId",
  ValidateSchema(Schemas.user.update),
  controller.updateUser
);
router.delete("/:userId", controller.deleteUser);

export = router;

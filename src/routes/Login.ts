import express from "express";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";
import controller from "../controllers/Login.controller";

const router = express.Router();

router.post("/", controller.loginUser);

export = router;

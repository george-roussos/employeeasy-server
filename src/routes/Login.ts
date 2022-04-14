import express from "express";
import controller from "../controllers/Login.controller";

const router = express.Router();

router.post("/", controller.loginUser);

export = router;

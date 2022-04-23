import controller from "../controllers/Login.controller";
import express from "express";

const router = express.Router();

router.post("/", controller.loginUser);

export = router;

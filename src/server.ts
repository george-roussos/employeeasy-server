import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import logger from "./utils/Logging";
import { Request, Response, NextFunction } from "express";
import employeeRoutes from "./routes/Employee";
import userRoutes from "./routes/User";
import loginRoutes from "./routes/Login";

const router = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    logger.info("Connected to mongoDB instance");
    StartServer();
  })
  .catch((e) => logger.error(`Unable to connect to mongoDB instance: "${e}"`));

const StartServer = () => {
  /** Log info for all requests */
  router.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(
      `Incoming request: Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on(`finish`, () => {
      logger.info(
        `Incoming request: Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - Status: [${res.statusCode}]`
      );
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));

  router.use(express.json());

  /** Rules of the API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */

  router.use("/employees", employeeRoutes);
  router.use("/users", userRoutes);
  router.use("/login", loginRoutes);

  /** Healthcheck */
  router.get("/healthz", (req, res, next) =>
    res.status(200).json({ message: "OK" })
  );

  /** Error handling if request does not bounce against a valid route */

  router.use((req, res, next) => {
    const error = new Error("not found");
    logger.error(error);
    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      logger.info(`Server running on port ${config.server.port}`)
    );
};

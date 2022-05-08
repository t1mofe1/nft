import cors from "cors";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/api";
import indexRouter from "./routes/index";
import graphqlRouter from "./routes/graphql";

dotenv.config();
const instance = express();

if (instance.get("env") !== "production") {
  instance.set("trust proxy", 1);
  instance.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    })
  );
}

instance.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "dlfngkfsdngjkkre84teuirgjdfsg",
    cookie: { secure: instance.get("env") === "production" },
  })
);

instance.use(morgan("dev"));
instance.use(
  express.json({
    limit: "10mb",
  })
);
instance.use(cookieParser());

instance.use("/", indexRouter);
instance.use("/api", apiRouter);
instance.use("/graphql", graphqlRouter);
instance.use(express.static(path.join(__dirname, "public")));

export default http.createServer(instance);

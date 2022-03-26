import cors from "cors";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import apiRouter from "./routes/api";
import indexRouter from "./routes/index";
import graphqlRouter from "./routes/graphql";

dotenv.config();
const instance = express();

if (process.env.NODE_ENV !== "production") {
  instance.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    })
  );
}

instance.use(morgan("dev"));
instance.use(express.json());
instance.use(cookieParser());
instance.use(express.urlencoded({ extended: false }));

instance.use("/", indexRouter);
instance.use("/api", apiRouter);
instance.use("/grapqhl", graphqlRouter);
instance.use(express.static(path.join(__dirname, "public")));

export default http.createServer(instance);

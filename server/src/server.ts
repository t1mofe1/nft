import cors from "cors";
import path from "path";
import http from "http";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import routerIndex from "./routes/index";

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

instance.use("/", routerIndex);
instance.use(express.static(path.join(__dirname, "public")));

export default http.createServer(instance);

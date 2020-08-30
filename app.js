import express from "express";
import { config } from "dotenv";
import { resolve } from "path";
import cors from "cors";

import { userRouter } from "./routes/userRouter";
import { postRouter } from "./routes/postRouter";

config({
  path: resolve("config.env"),
});

const app = express();

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res, next) => {
  res.send(`<h1>This is August test </h1>
        <h3>By Rahul Abhishek</h3>`);
});

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Page Not Found",
  });
});

app.use((err, req, res, next) => {
  if (err.name == "ValidationError") {
    return res.send(err);
  }

  err.name = err.name;
  err.statusCode = err.statusCode || 500;
  err.stack = err.stack;
  err.message = err.message;

  res.status(err.statusCode).json({
    errorname: err.name,
    message: err.message,
    occuredAt: err.stack,
  });
});

export { app as default };

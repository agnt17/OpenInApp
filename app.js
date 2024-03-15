import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js"
import subTaskRouter from "./routes/subTask.route.js"
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", taskRouter);
app.use("/api/v1/users", subTaskRouter);
export { app };
//cookieParser is used to set and access cookies coming from the server.

//middleware is just the checking in the middle means if u hit a particular api then if u want that the server first checks whether the user is logged in or not then it could be checked using middleware.

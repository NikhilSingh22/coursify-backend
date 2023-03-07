import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./config/config.env",
});

const app = express();

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// IMPORTING AND USING ROUTES
import courseRoute from "./routes/courseRoutes.js";
import userRoute from "./routes/userRoutes.js";
import other from "./routes/otherRoutes.js";

app.use("/api/v1", courseRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site in working. click <a href=${process.env.FRONTEND_URL}>here</a> to visite the frontend.</h1>`
  )
);

app.use(ErrorMiddleware);

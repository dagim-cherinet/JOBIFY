//i am using ES6 module here to import express module
//const express = require('express')--> commonJS but i am using ES6 module first add "type": "module" in
// the package.json file because node js is by default common js so it does'nt allow us to use import as // react-js reason for using import is only for consistent with the whole application.
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

//db and authenticateUser
import connectDB from "./db/connect.js";

//router
import authRouter from "./routes/authRoutes";

//middleware
import notFound_middleware from "./middleware/not-found.js";
import errorHandler_middleware from "./middleware/error-handler.js";

app.use("/api/v1/auth", authRouter);
app.get("/", (req, res) => {
  //throw new Error("my error");
  console.log("someone is checking the server");
  res.send("<h1>Welcome to the server</h1>");
});
app.use(notFound_middleware);
app.use(errorHandler_middleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
import dotenv from "dotenv";
// pull PORT from .env, give default value of 3000
// pull DATABASE_URL from .env
const { PORT = 4444, DATABASE_URL } = process.env;
// import express
import express from "express";
// create application object
const app = express();
// import mongoose
import mongoose from "./db/connection.js";
// import middlware
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./controllers/auth.js"
import noteRouter from "./controllers/note.js"

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hi server");
// });

app.use("/auth", authRouter)
app.use("/note", noteRouter)

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(cookieParser()); // parses cookies


///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

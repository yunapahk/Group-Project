///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
import dotenv from "dotenv"
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
//Read .env file
dotenv.config()

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(cookieParser()); // parse cookies 

///////////////////////////////
// ROUTES
////////////////////////////////
// Test route
app.get("/", (req, res) => {
  res.send("Hi server");
});

app.use("/auth", authRouter)

// INDEX 
app.get("/note", async (req, res) => {
  try {
    // send all notes
    res.json(await Note.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// SHOW 
app.get("/note/:id", async (req, res) => {
  try {
    // find note by id using req.params.id
    const note = await Note.findById(req.params.id);
    // send note
    res.json(note);
  } catch (error) {
    // send error
    res.status(400).json(error);
  }
});

// CREATE 
app.post("/note", async (req, res) => {
  try {
    // send all notes
    res.json(await Note.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// UPDATE
app.put("/note/:id", async (req, res) => {
    try {
      // send all notes
      res.json(
        await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // DELETE
  app.delete("/note/:id", async (req, res) => {
    try {
      // send all notes
      res.json(await Note.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

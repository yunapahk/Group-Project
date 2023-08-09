///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
// pull DATABASE_URL from .env
const { PORT = 4444, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Connected to mongoose. Good job!"))
  .on("close", () => console.log("Disconnected from mongoose... Fix me!"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const NoteSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Note = mongoose.model("Note", NoteSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// Test route
app.get("/", (req, res) => {
  res.send("Hi server");
});

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

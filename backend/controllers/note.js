import express from "express";
import Note from "../models/notes.js";
import isLoggedIn from "../utils/isLoggedIn.js";

const router = express.Router()

router.use(isLoggedIn)//middleware to make sure the user is logged in

///////////////////////////////
// ROUTES
////////////////////////////////
  // INDEX 
  router.get("/", async (req, res) => {
    try {
        const username = req.payload.username
      // send all notes
      res.json(await Note.find({username}));
      // res.json(await Note.find({}));
    } catch (error) {
      //send error
      res.status(400).json({error});
    }
  });
  
  // SHOW 
  router.get("/:id", async (req, res) => {
    try {
        const username = req.payload.username
      // find note by id using req.params.id
      const note = await Note.findOne({ username, _id:req.params.id });
      // send note
      res.json(note);
    } catch (error) {
      // send error
      res.status(400).json({error});
    }
  });
  
  // CREATE 
  router.post("/", async (req, res) => {
    try {
      console.log(req.payload)
        const username = req.payload.username
        req.body.username = username
      // send all notes
      const newNote = await Note.create(req.body);
      console.log(newNote)
      res.json(newNote)
    } catch (error) {
      //send error
      res.status(400).json({error});
    }
  });
  
  // UPDATE
  router.put("/:id", async (req, res) => {
      try {
        const username = req.payload.username
        req.body.username = username
        // send all notes
        res.json(
          await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
      } catch (error) {
        //send error
        res.status(400).json({error});
      }
    });
    
    // DESTROY
    router.delete("/:id", async (req, res) => {
      try {
        const username = req.payload.username
        req.body.username = username
        // send all notes
        const note = await Note.deleteOne({_id: req.params.id, username})
      } catch (error) {
        //send error
        res.status(400).json({error});
      }
    });

export default router
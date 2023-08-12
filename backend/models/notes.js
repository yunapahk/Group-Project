import mongoose from "../db/connection.js";

const {Schema, model} = mongoose; // Destructuring

///////////////////////////////
// MODELS
////////////////////////////////
const NoteSchema = new Schema({
    title: String,
    description: String,
    url: String
  });
  
  const Note = model("Note", NoteSchema);

  export default Note
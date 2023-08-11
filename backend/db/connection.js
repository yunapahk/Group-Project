// get .env variables
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL

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

export default mongoose
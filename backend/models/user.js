import mongoose from "../db/connection.js";

const {Schema, model} = mongoose; //Destructuring

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  });
  
  const User = model("User", UserSchema);

  export default User
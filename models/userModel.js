const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email não informado"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Senha não informada"],
    trim: true,
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);

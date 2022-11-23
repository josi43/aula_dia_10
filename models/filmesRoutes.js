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
    validate:{
      validator :function(valor){
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valor);
      },
      message: 'Senha nao tem carater especial e letra maisucula'
    }
  },
});
userSchema.pre('save', (next) =>{
  const hash =bcrypt.hashSync(this.password,8);
  this.password = hash;
  next();
});

module.exports = mongoose.model("User", userSchema);

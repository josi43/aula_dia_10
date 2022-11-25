const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/filmesRoutes");
const config = require("../config/env.json");


async function registrar(req, res) {
  const {email, password} = req.body
  if(!email){
    res.status(422).json({msg:"Email obrigratorio"})
  }
  if(!password){
    res.status(422).json({msg:"senha obrigratorio"})
  }
  const userExists = await User.findOne({email:email})
  if(userExists){
    return res.status(422).json({msg:"usuario ja cadastrado, por favor mude o email!"})
  }
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    email,
    password: passwordHash,
  });

  try{
    await user.save()
    res.status(201).json({msg:"Usuario cadastrado com sucesso!"})
  } catch(error){
    console.log(error)
    res.status(500).json({msg:"algum erro interno"})
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if(!email){
    return res.status(422).json({msg:"Email obrigratorio"})
  }
  if(!password){
    return res.status(422).json({msg:"senha obrigratorio"})
  }
  const user = await User.findOne({email:email})
  
  if(!user){
    return res.status(422).json({msg:"usuario nao encontrado!"})
  }
  const checkPassword = await bcrypt.compare(password, user.password)
  
  if(!checkPassword){
    return res.status(422).json({msg:"senha invalida"})
  }

  try{
    const secret = config.secret

    const token = jwt.sign({
      id:user._id,
    },
    secret,)
    
    res.status(200).json({msg:"logado com sucesso ", token})

  } catch(err) {
    console.log(err)
    res.status(500).json({msg:"algum erro interno"})
  }
}

module.exports = { registrar, login };

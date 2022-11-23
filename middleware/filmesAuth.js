const jwt = require("jsonwebtoken");

const config = require('../config/env.json');

module.exports = async function(req, res, next){
const {authorization} = req.headers;
if(!authorization){
    return res.status(401).json({erro: "Token não enviado"});
}

const [tipo, token] = authorization.split(' ');

if (!token){
    return res.status(401).json({erro: "Token não enviado"});
}
jwt.verify(token, config.segredo, (error, userInfo) =>{
    if (error) {
    return res.status(401).json({erro: "Token invalido"});
    }
    req.body.id = userInfo.id;
});
next();
}
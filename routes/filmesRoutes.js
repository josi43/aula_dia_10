const express = require("express");
const controller = require("../controllers/filmesControllers");
const autentica = require("../middleware/filmesAuth");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json("testando")
})

router.post("/cadastrar", controller.registrar);
router.post("/login", controller.login);

module.exports = router;

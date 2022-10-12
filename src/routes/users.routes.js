const router = require("express").Router()

const {postUser, getUser} = require("../controllers/users.controllers")

router.post("/registro", postUser )

router.post("/login", getUser)

module.exports = router;
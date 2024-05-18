import express from "express"
const router = express.Router()
import {login, register, setAvatar} from "../controllers/authController"

router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)

export default  router
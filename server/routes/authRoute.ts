import express from "express"
const router = express.Router()
import {getAllUsers, login, register, setAvatar} from "../controllers/authController"

router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)
router.get("/getAllUsers/:id", getAllUsers )

export default  router
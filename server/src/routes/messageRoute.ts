import express from "express"
import { AllMessage, SendMessage } from "../controllers/messageController"
const router = express.Router()

router.post('/sendMsg', SendMessage)
router.post('/getMsg', AllMessage)

export default  router
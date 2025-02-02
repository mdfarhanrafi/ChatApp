import express from "express"
import Messagecontroller from "../Controller/message.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get('/users',protectRoute,Messagecontroller.getUsers).get('/:id',protectRoute,Messagecontroller.getMessages)
router.post('/send/:id',protectRoute,Messagecontroller.sendMessage)

export default router
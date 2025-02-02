import express from "express"
import Authcontroller from "../Controller/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()


router.post('/signup',Authcontroller.signUp).post('/login',Authcontroller.login).post('/logout',Authcontroller.logOut)
router.put('/update-profile',protectRoute, Authcontroller.profileUpdate)
router.get('/check',protectRoute,Authcontroller.checkUserAuth)

export default router
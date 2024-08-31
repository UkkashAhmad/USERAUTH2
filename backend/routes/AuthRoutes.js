import express from "express";
import {Register,Login, Logout, UpdateUser, GetUser} from '../controllers/AuthControllers.js'
import { protect } from "../middlewares/authMiddileware.js";

const router = express.Router()


router.post('/register', Register)
router.post('/login', Login)
router.post('/logout', Logout)
router.get('/profile', protect, GetUser)
router.put('/profile', protect, UpdateUser)


export default router
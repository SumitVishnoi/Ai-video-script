import express from 'express'
import { getUser, login, logout, register } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middlewares/isAuth.middleware.js'

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)

//get
router.get("/getuser", authMiddleware, getUser)

export default router
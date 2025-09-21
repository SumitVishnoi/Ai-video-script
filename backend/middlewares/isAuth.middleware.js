import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(400).json({
            message: "Please login first"
        })
    }

   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    req.userId = user

    next()
   } catch (error) {
    return res.status(500).json({message:"Invalid Token" })
   }
}
import userModel from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async(req, res)=> {
    try {
        const {name, email, password} = req.body

    const isAlreadyExist = await userModel.findOne({email})

    if(isAlreadyExist) {
        return res.status(400).json({
            message: "User already exist"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        message: "Registration successfully",
        name: user.name,
        email: user.email
    })
    } catch (error) {
        return res.status(500).json({
            message: `register error ${error}`
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(400).json({
                message: "Invalid Email and Password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Email and Password"
            })
        }

        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        })

        return res.status(200).json({
            message: "Login user successfully",
            email: user.email,
            name: user.name
        })
    } catch (error) {
        return res.status(500).json({message: `login error ${error}`})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")

    return res.status(200).json({
        message: "logout successfully"
    })
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`})
    }
}


//get user
export const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password")

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: `getUser error ${error}`})
    }
}
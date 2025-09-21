import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDB from './DB/db.js'
import dotenv from 'dotenv'
import router from './routes/auth.route.js'

dotenv.config()
const app = express()
const port = 3000
connectDB()
app.use(cors({
  origin: ["http://localhost:5173", "https://ai-videoscript.netlify.app"],
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=> {
    res.send("server is done")
})

app.use("/api/auth", router)


app.listen(port, ()=> {
    console.log("Server started at port", port)
})
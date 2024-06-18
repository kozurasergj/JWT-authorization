import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import ErrorMiddleware from './middlewares/error-middlewares.js'
import router from './router/index.js'

config()
const app = express()
const PORT = process.env.PORT || 4040
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use('/api', router)
app.use(ErrorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()

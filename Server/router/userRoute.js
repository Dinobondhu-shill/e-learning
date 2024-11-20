import express from 'express'
import { login, registerUser } from '../controller/useController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', login)

export default userRouter
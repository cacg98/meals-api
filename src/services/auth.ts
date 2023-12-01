import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import { User } from "../models/user"
import { IUser } from "../common/interfaces/user"
import { CustomError } from "../common/customError"

export async function register(user: IUser) {
    const userExist = await User.findOne({ email: user.email })

    if (userExist) throw new CustomError('Email already used', 409)

    const hashPassword = await bcrypt.hash(user.password, 10)
    const newUser = await User.create({
        email: user.email,
        password: hashPassword
    })
    return newUser
}

export async function login(user: IUser) {
    const existingUser = await User.findOne({ email: user.email })

    if (!existingUser) throw new CustomError('Wrong email or password', 409)

    const isValidPassword = await bcrypt.compare(user.password, existingUser.password)

    if (!isValidPassword) throw new CustomError('Wrong email or password', 409)
    
    const accessToken = generateToken(existingUser._id.toString(), '15m')
    const refreshToken = generateToken(existingUser._id.toString(), '1h')
    return { accessToken, refreshToken }
}

function generateToken(userId: string, expiresIn) {
    return jwt.sign({ data: userId }, process.env.TOKEN_SECRET, { expiresIn })
}

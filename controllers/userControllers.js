import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { setToken } from '../utils/features.js'
import ErrorHandler from '../middlewares/error.js'

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    let user = await User.findOne({ email })

    if (!user) return next(new ErrorHandler('User not found', 400))

    const hashPaasword = await bcrypt.hash(password, 10)
    user = await User.create({
      name,
      email,
      password: hashPaasword,
    })

    setToken(user, res, 'Registered Successfully', 201)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) return next(new ErrorHandler('User not found', 400))
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return next(new ErrorHandler('Invalid Email or Password', 400))
    setToken(user, res, `Welcome back ${user.name}`, 200)
  } catch (error) {
    next(error)
  }
}

export const logout = (req, res) => {
  res
    .status(200)
    .cookie('token', '', {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'Development' ? false : true,
    })
    .json({
      success: true,
      message:"User successfully Logged out"
    })
}

export const getOneUser = (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  })
}
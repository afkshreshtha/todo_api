import express from 'express'

import {
  getOneUser,
  register,
  login,
  logout,
} from '../controllers/userControllers.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', isAuthenticated, logout)

router.get('/me', isAuthenticated, getOneUser)

export default router

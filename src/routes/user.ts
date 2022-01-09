


import express from 'express'
import { createUserCon,loginUSerCon,validateCon } from '../controllers/user'
import { createUserMid } from '../middleware/createUser'
import { loginUserMid } from '../middleware/loginUser'
import { validateToken } from '../middleware/auth'

const router = express.Router()

router.post('/create',createUserMid,createUserCon)
router.post('/login',loginUserMid,loginUSerCon)
router.get('/auth',validateToken,validateCon )

export default router
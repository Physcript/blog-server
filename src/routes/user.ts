


import express from 'express'
import { createUserCon,loginUSerCon } from '../controllers/user'
import { createUserMid } from '../middleware/createUser'
import { loginUserMid } from '../middleware/loginUser'

const router = express.Router()

router.post('/create',createUserMid,createUserCon)
router.post('/login',loginUserMid,loginUSerCon)

export default router


import express from 'express'
import blogCon from '../controllers/blog'
import { validateToken } from '../middleware/auth'

const router = express.Router()


router.get('/:blogID', blogCon.readBlog)
router.post('/create', blogCon.createBlog)
router.post('/readAll', blogCon.readAllBlog)
router.patch('/update/:blogID', blogCon.editBlog)
router.delete('/:blogID', blogCon.deleteBlog)
router.get('/',blogCon.readAllBlog)

export default router


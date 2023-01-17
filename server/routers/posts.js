import express from 'express'
import { getPosts, getPost, createPosts, commentPost, updatePost, likePost, deletePost, getPostBySearch } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.get('/post/:id', getPost)
router.get('/search', getPostBySearch)
router.post('/', auth, createPosts)
router.post('/:id/comment', commentPost)
router.patch('/:id', auth, updatePost)
router.patch('/like/:id', auth, likePost)
router.delete('/:id',auth, deletePost)

export default router
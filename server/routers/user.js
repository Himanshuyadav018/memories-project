import express from 'express'
const Router = express.Router()

import {signUp,signIn, getUser, updateUser, deleteUser} from '../controllers/user.js'

Router.post('/signup', signUp)
Router.post('/signin', signIn)

Router.get('/:id', getUser)
Router.patch('/:id', updateUser)
Router.get('/:id', deleteUser)

export default Router
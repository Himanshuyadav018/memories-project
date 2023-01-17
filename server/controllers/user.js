import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/users.js';

export const signUp = async (req, res) => {
    const user = req.body
    
    console.log('hello signup')
    try{
        const doesUserExist = await User.findOne({email: user.email})
    
        if(doesUserExist) return res.status(404).send({message: 'User already exists'})

        if(user.password !== user.confirmPassword) return res.status(404).json({message: 'wrong password match'})

        const hashedPassword = await bcrypt.hash(user.password, 12) 

        const createUser = new User({email: user.email, password:hashedPassword, name: `${user.firstName} ${user.lastName}`})

        await createUser.save()

        const token = jwt.sign({email: createUser.email, id: createUser._id}, 'test', {expiresIn: '1h'})

        res.status(201).json({user:createUser, token})
    }catch(err) {
        res.status(500).json({message: err.message})
        console.log('hello')
    }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body
    console.log('hello signup')

    try{
        const user = await User.findOne({email})

        if(!user) return res.status(404).json({message: 'User doesn"t exist!'})

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(401).json({message: 'Invalid credentials'})

        const token = jwt.sign({email: user.email, id: user._id}, 'test', {expiresIn: '1h'})

        res.status(200).json({user, token})
    }catch(err) {
        res.status(500).json({message: err.message})
        console.log({message: err.message})
    }
}


export const getUser = async (req, res) => {
    const {id}  = req.params
    try{
        const user = await User.findById(id)

        res.status(200).json(user)
    }catch(err) {
        res.status(404).send(err)
    }
}


export const updateUser = async (req, res) => {
    const {id} = req.params
    const user = req.body

    try{
        const updatedUser = await User.findByIdAndUpdate(id, {...user, _id: id }, { new: true })

        res.status(200).json(updateUser)
    }catch(err) {
        res.status(404).send(err)
    }
}


export const deleteUser = async (req, res) => {
    const {id} = req.params

    try{
        await User.findByIdAndRemove()

        res.status(200).send('deleted successfully')
    }catch(err) {
        res.status(404).send(err)
    }
}
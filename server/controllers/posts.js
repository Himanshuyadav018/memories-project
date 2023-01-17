import { response } from 'express'
import mongoose from 'mongoose'
import postMessages from '../models/postMessages.js'

// GET POSTS FUNCTION
export const getPosts = async (req, res) => {
    const {page} = req.query
    
    try {
        const limit = 8
        const startIndex = (Number(page) - 1) * limit
        const total = await postMessages.countDocuments({})

        const post = await postMessages.find().sort({ _id: -1}).limit(limit).skip(startIndex)

        res.status(200).json({ data: post, noOfPages: Math.ceil(total/limit), currentPage: Number(page) })

    } catch(error) {
        res.status(404).send({message: error.message})
    }
}

// GET POST BY ID FUNCTION
export const getPost = async (req, res) => {
    const {id} = req.params
    console.log('hello')
    try{
        const post = await postMessages.findById(id)
        
        res.status(201).json(post)
    }catch(err) {
        res.status(404).send({message: err.message})
    }
}

// GET POST BY SEARCH FUNCTION 

export const getPostBySearch = async (req, res) => {
    const {search, tags} = req.query
    console.log('hello2')

    try {
        const title = new RegExp(search, 'i')
        const postMessage = await postMessages.find({ $or: [{ title }, { tags: { $in : tags.split(',')}}]})

        res.status(200).json(postMessage)

    } catch(error) {
        res.status(404).send({message: error.message})
    }
}

// CREATE POST FUNCTION
export const createPosts = async (req, res) => {
    const post = req.body

    const newPost = new postMessages({...post, creator: req.userId, createAt: new Date().toISOString() })
    try{
        await newPost.save()

        res.status(201).json(newPost)
    }catch(err) {
        res.status(409).send({message: err.message})
    }
}

// UPDATE POST FUNCTION
export const updatePost = async (req, res) => {
    const { id } = req.params
    const post = req.body
    console.log('fired!')

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send('No post with this id')

    try{
        const response = await postMessages.findByIdAndUpdate(id, {...post, _id : id }, {new: true})

        res.status(200).json(response)
    }catch(err) {
        console.log({error: err.message})
    }
}

// UPDATE LIKE FUNCTION
export const likePost = async (req, res) => {
    const { id } = req.params

    if(!req.userId) res.status(404).json({message: 'Not Authenticated!'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send('No post with this id')
    
    try{
        console.log('hi!')
        const post = await postMessages.findById(id)

        const findIndex = post.likes.findIndex(like => like === String(req.userId))

        if(findIndex === -1){
            post.likes.push(req.userId)
        }else{
            post.likes.filter(like => like !== String(req.userId))
        }
        const response = await postMessages.findByIdAndUpdate(id, post, 
                                                            {new: true})

        res.status(200).json(response)
    }catch(err) {
        console.log({error: err.message})
    }
}

// DELETE POST FUNCTION
export const deletePost = async (req, res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(401).send('No post with this id')

    try{
        await postMessages.findByIdAndDelete(id)

        response.status(200).send('Successfully deleted!')
    }catch(err) {
        console.log({error: err.message})
    }
}

// COMMENT POST FUNCTION
export const commentPost = async (req, res) => {
    const { id } = req.params
    const { value } = req.body

    try{
        const post  = await postMessages.findById(id)

        post.comment.push(value)

        const updatePost = await postMessages.findByIdAndUpdate(id, post, { new: true})

        res.status(201).json(updatePost)
    }catch(err) {
        console.log({error: err.message})
    }
}
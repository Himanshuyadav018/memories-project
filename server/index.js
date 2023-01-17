import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from './mongodb/mongoose.js'
import postRoutes from './routers/posts.js'
import userRoutes from './routers/user.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/auth', userRoutes)

app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})

export default app
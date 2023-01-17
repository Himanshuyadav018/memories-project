import react, { useEffect, useState } from 'react'
import { Typography, Paper, TextField, Button } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

import styles from './styles.js'
import { createPost, updatePost } from '../../actions/posts.js'

const Form = ({currentId, setcurrentId}) => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postData, setPostData] = useState({tags: '', title: '', message: '', selectedFile: ''})

    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null)

    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleChange = (e) => {
        e.preventDefault()

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.user.name}))
        }else{
            dispatch(createPost({...postData, name: user?.user.name}, navigate))
        }
        clear()
    }

    const clear = () => {
        setcurrentId(0)
        setPostData({ tags: '', title: '', message: '', selectedFile: '' })
    }

    if(!user?.user?.name){
        return(
        <Paper className={classes.paper} elevation={6}>
            <Typography variant='h6' align='center'>
                Please Sign in to create youe own memories
            </Typography>
        </Paper>
    )}

    return (
        <Paper className={classes.paper} elevation={6}>
        <form className={`${classes.form} ${classes.root}`} autoComplete='off' noValidate onSubmit={handleChange}>

            <Typography variant="h6" align="center">{currentId ? 'Editing' : 'Creating'} a memory</Typography>

            <TextField variant='outlined' fullWidth name="title" label="Title" value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />

            <TextField variant='outlined' fullWidth name="message" label="Message" value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />

            <TextField variant='outlined' fullWidth name="tags" label="Tags" value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />

            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
            </div>

            <Button className={classes.buttonSubmit} variant='contained' type="submit" color="primary" size="large" fullWidth>Submit</Button>

            <Button variant='contained' color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
        </Paper>
    )
}

export default Form
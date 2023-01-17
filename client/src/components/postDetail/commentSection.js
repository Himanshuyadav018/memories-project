import React, {useState, useRef} from 'react';
import { Typography, TextField, Button } from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.js';
import { commentPost } from '../../actions/posts.js'

const CommentSection = ({ post }) => {
    const classes = styles()
    const dispatch = useDispatch()
    const commentRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'))
    const [ comments, setComments ] = useState(post?.comment)
    const [ comment, setComment ] = useState('')

    const handleClick = async () => {
        const finalComment = `${user.user.name} : ${comment}`
        const comments = await dispatch(commentPost(finalComment, post._id))

        setComments(comments)
        setComment('')

        commentRef.current.scrollIntoView({ behaviour: 'smooth'})
    }

    return (
        <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography variant='h6' gutterBottom>Comments</Typography>
                {
                  comments.map((c, i) => (
                    <Typography key={i} variant='subtitle1' gutterBottom>
                        <strong>{c.split(': ')[0]}</strong>:
                        { c.split(':'[1])}
                    </Typography>
                  ))
                }
                <div ref={commentRef}></div>
            </div>
            {user?.user?.name && (
            <div style={{ width: '70%'}}>
                <Typography variant='h6' gutterBottom>Write a comment</Typography>

                <TextField variant='outlined' fullWidth minRows={4} multiline label='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                
                <div style={{  display: 'flex', justifyContent: 'center'}}>
                <Button style={{ marginTop: '10px', }} disabled={!comment} variant='contained' color='primary' onClick={handleClick}>Submit</Button>
                </div>

            </div>
            )}
        </div>
        </div>
    )
}

export default CommentSection;
import react from 'react' 
import { useDispatch } from 'react-redux'
import {Card, CardMedia, CardActions, Typography, CardContent, Button, ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useNavigate} from 'react-router-dom'
import styles from './styles.js'
import {updateLike, deletePost} from '../../../actions/posts.js'

const Post = ({post, setcurrentId}) => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('profile'))

    const seeDetails = (e) => {
        navigate(`/post/${post._id}`)
    }

    return (
        <Card className={classes.card}>
        <div onClick={seeDetails}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>

            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
        </div>

            { (user?.user?.sub === post.creator || user?.user?._id === post.creator) && 
            (<div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => {setcurrentId(post._id)}}>
                    <MoreHorizIcon />
                </Button>
            </div>
            )}

            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>

            <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography> 

            <CardContent>
                <Typography  variant='body2' color='textSecondary' gutterBottom>{post.message}</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>

                <Button color='primary' disabled={!user?.user} size='small' onClick={() => dispatch(updateLike(post._id))}>
                    <ThumbUpAltIcon />
                    &nbsp; Likes &nbsp;
                    {post.likes.length}
                </Button>

                { (user?.user.sub === post.creator || user?.user._id === post.creator) &&
                (<Button color='error' size='small' onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon />
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
import react from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './post/post.js'
import styles from './styles.js'


const Posts = ({setcurrentId}) => {
    const classes = styles()
    const {posts, isLoading} = useSelector((state) => state.posts)

    if(!posts.length && !isLoading) return "NO POSTS"

    return (
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                { posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} md={4}>
                        <Post post={post} key={'post'} setcurrentId ={setcurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts
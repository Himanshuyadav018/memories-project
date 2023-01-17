import React, { useEffect, useState } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import {useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './styles.js'
import Posts from '../posts/posts.js'
import Form from '../form/form.js'
import { getPostBySearch } from '../../actions/posts.js'
import Paginate from '../pagination/pagination.js'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('search')

    const [currentId, setcurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostBySearch({search, tags: tags.join(',')}))
            navigate(`/post/search?search=${search || 'none'}&tags=${tags.join(',')}`)
        }else {
            navigate('/')
        }
    }

    const onKeyPress = (e) => {
        if(e.KeyCode === 13){
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


  return (
    <Grow in>
    <Container>
        <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={4}>

            <Grid item xs={12} sm={6} md={9}>
                <Posts setcurrentId={setcurrentId}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>

                <AppBar className={classes.appBarSearch} position='static' color='inherit'>

                    <TextField  name='search' variant='outlined' label='Search' onChange={(e) => setSearch(e.target.value)} fullWidth value={search} onKeyDown={onKeyPress}/>

                    <ChipInput style={{margin: '10px 0px' }} variant='outlined' value={tags} label='Search Tags' onAdd={handleAdd} onDelete={handleDelete}/>

                    <Button variant='contained' color='primary' onClick={searchPost}>Search</Button>
                </AppBar>

                <Form currentId={currentId} setcurrentId={setcurrentId}/>
                { (!search && !tags.length) && (
                <Paper className= {classes.pagination} elevation={6}>
                    <Paginate page={page}/>
                </Paper>
                )}
            </Grid>
        </Grid>
    </Container>
</Grow>
  )
}

export default Home

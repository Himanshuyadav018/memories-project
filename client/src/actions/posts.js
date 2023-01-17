import * as api from '../api/index.js'

//  contains all the action for post components.

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: 'START_LOADING'})
        let { data } = await api.fetchPosts(page)
        console.log(page)
        dispatch({type: 'FETCH_ALL', payload: data})
        dispatch({type: 'END_LOADING'})
    }catch(error) {
        console.log({error: error.message})
    }
}

export const getPost = (id) => async (dispatch) => {
    try{    
        dispatch({type: 'START_LOADING'})
        let {data} = await api.fetchPost(id)

        dispatch({type: 'FETCH_POST', payload: data})
        dispatch({type: 'END_LOADING'})
    }catch(err) {
        console.log(err.message)
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try{
        dispatch({type: 'START_LOADING'})
        let { data } = await api.fetchPostBySearch(searchQuery)
    
        dispatch({type: 'FETCH_ALL_BY_SEARCH', payload: data})
        dispatch({type: 'END_LOADING'})
    }catch(error) {
        console.log({error: error.message})
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        const { data } = await api.postPost(post)
        
        navigate(`/post/${data._id}`)
        dispatch({type: 'CREATE_POST', payload: data})
    }catch(error){
        console.log({error: error.message})
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const { data } = await api.updatePost(id, post)

        dispatch({type: 'UPDATE', payload: data})
    }catch(err) {
        console.log({error: err.message})
    }
}

export const updateLike = (id) => async (dispatch) => {
    try{
        const { data } = await api.updateLike(id)

        dispatch({type: 'LIKE', payload: data})
    }catch(err) {
        console.log({error: err.message})
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try{
        const { data } = await api.comment(value, id)

        dispatch({type: 'COMMENT' , payload: data})

        return data.comment
    }catch(err) {
        console.log(err.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id)

        dispatch({type: 'DELETE', payload: id})
    }catch(err) {
        console.log({error: err.message})
    }
}

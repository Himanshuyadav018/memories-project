import axios from 'axios'

const API = axios.create({baseURL : 'http://localhost:5000'})

let config = {}

if(localStorage.getItem('profile')){
    config = {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        }
    }
}

export const fetchPosts = (page) => axios.get(`/posts?page=${page}`)

export const fetchPost = (id) => axios.get(`/posts/post/${id}`)

export const fetchPostBySearch = (searchQuery) => axios.get(`/posts/search?search=${searchQuery.search}&tags=${searchQuery.tags}`)

export const postPost = (post) => axios.post('/posts', post, config)

export const updatePost = (id, post) => axios.patch(`/posts/${id}`, post, config)

export const updateLike = (id) => axios.patch(`/posts/like/${id}`,{}, config)

export const comment = (value, id) => axios.post(`/posts/${id}/comment`, {value}, config)

export const deletePost = (id) => axios.delete(`/posts/${id}`, config)

export const signUp = (formData) => axios.post(`/auth/signup`, formData)

export const signIn = (formData) => axios.post(`/auth/signin`, formData)

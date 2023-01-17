import * as api from '../api/index.js'

export const signUp = (formData, navigate) => async (dispatch) => {
    try{
    const {data} = await api.signUp(formData)
    console.log('hello', data)

    dispatch({type: 'AUTH', payload: data})
    navigate('/')
    }catch(err) {
        console.log({message: err.message})
    }
}

export const signIn = (formData, navigate) => async (dispatch) => {
    try{
    const {data} = await api.signIn(formData)
    console.log('hello', data)

    dispatch({type: 'AUTH', payload: data})
    navigate('/')
    }catch(err) {
        console.log({message: err.message})
    }
}
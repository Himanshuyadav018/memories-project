import  React, { useState } from 'react'
import {Container, Grid, Avatar, Typography, Paper, Button } from '@material-ui/core'
import LockOutlinedOut from '@material-ui/icons/LockOutlined'
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './styles.js'
import Input from './inputField.js'
import Icon from './icon.js'
import {signUp, signIn} from '../../actions/auth.js'

const initialState = {email: '', password: '', confirmPassword: '', firstName: '', lastName: ''}

const Auth = () => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp){
            dispatch(signUp(formData, navigate))

        }else {
            dispatch(signIn(formData, navigate))
        }     
    }
    
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const signToggle = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }

    const success = async (res) => {
        const credential = jwt_decode(res.credential)
        const data = {user:credential, token: credential.sub}
        try{
            dispatch({type: 'AUTH' , payload: data})
            navigate('/')
        }catch(err) {
            console.log(err)
        }
    }

    const failure = (err) => {
        console.log(err.details)
    }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            
            <Avatar className={classes.avatar}>
                <LockOutlinedOut />
            </Avatar>

            <Typography variant='h5' component='h1'>{isSignUp ? 'Sign up': 'Sign In'}</Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>

                { isSignUp && (
                <>
                <Input name='firstName' label='FirstName' handleChange={handleChange} autoFocus={true} type='text' half/>

                <Input name='lastName' label='LastName' handleChange={handleChange} type='text' half/>
                </>
                )}

                <Input name='email' label='Email' handleChange={handleChange} type='email'/>
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>

                { isSignUp && (
                <Input name='confirmPassword' label='Confirm Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                )}   

            </Grid>

            <Button type='submit' fullWidth className={classes.submit} variant='contained' color='primary'>{isSignUp ? 'Sign Up': 'Sign In'}</Button>

            <GoogleLogin
                render={(renderProps) => (
                    <Button className={classes.googleButton} color='primary' fullWidth variant='contained' onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}>Google Sign In</Button>
                )}

                onSuccess={success}
                onError={failure}
                cookiePolicy='single_host_origin'
            />

            </form>

            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button onClick={signToggle}>{isSignUp ? 'Already have an account? Sign in': "Don't have an account? Sign Up"}</Button>
                </Grid>
            </Grid>

        </Paper>
    </Container>
  )
}

export default Auth

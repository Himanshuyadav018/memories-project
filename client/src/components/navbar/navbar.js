import React, {useState, useEffect} from 'react'
import {AppBar, Typography, Toolbar, Button, Avatar} from '@material-ui/core'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './styles.js'
import memories from '../../images/memories.png'

const Navbar = () => {
    const classes = styles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const logout = () => {
        dispatch({type: 'LOGOUT'})
        navigate('/auth')
        setUser(null)
    }

    useEffect(() => {
        if(user){
            if(user?.user.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>

        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
            <img className={classes.image} src={memories} alt='memories' height='60'/>
        </div>

        <Toolbar className={classes.toolbar}>

            {
                user ? (
                    <div className={classes.profile}>

                        <Avatar className={classes.purple} alt={user.user?.name} src={user.user?.picture}>{user.user?.name.charAt(0)}</Avatar>

                        <Typography className={classes.userName} variant='h6'>{user.user?.name}</Typography>

                        <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>

                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )
            }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar

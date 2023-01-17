import React from 'react';
import { Container } from '@material-ui/core'
import { Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider} from '@react-oauth/google'

import Navbar from './components/navbar/navbar.js'
import Home from './components/home/home.js'
import Auth from './components/auth/auth.js'
import PostDetail from './components/postDetail/postDetail.js'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <GoogleOAuthProvider clientId='1028753547008-atvtu7rcf64uark7rf6pp1q51k8fu15o.apps.googleusercontent.com'>

        <Container maxwidth='xl'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to='/post'/>}/>
                <Route path='/post' element={<Home />} />
                <Route path='/post/search' element={<Home />}/>
                <Route path='/post/:id' element={<PostDetail />}/>
                <Route path='/auth' element={!user ? <Auth /> : <Navigate to='/post'/>} />
            </Routes>
        </Container>
        
        </GoogleOAuthProvider>
    )
}

export default App
import React from 'react'
import "./Login.scss"
import { Button } from '@mui/material'
import { auth,provider } from '../../firebase.ts'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {

const logIn = async () => {
  await signInWithPopup( auth,provider ).catch( err => alert(err.message));
}

  return (
    <div className="login">
        <div className="loginLogo">
            <img src="./discordIcon.png" alt="/"/>
        </div>
        <Button onClick={logIn}>ログイン</Button>
       </div>
  )
}

export default Login;
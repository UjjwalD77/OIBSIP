import React, { useState } from 'react'
import './welcome.css'
import {Link} from 'react-router-dom'
import Login from './login'
import Register from './register'

function Welcome() {
    const [registerState,setRegisterState] = useState(false);
    const [loginState,setLoginState] = useState(true);


    const handleToggleClick = (type) => {
        console.log('here');
        if(type === 'reg'){
            if(!registerState){
                setRegisterState(!registerState)
                setLoginState(false)
                console.log('reg' + registerState)
                
            }
        }
        if(type === 'log'){
            if(!loginState){    
                setLoginState(!loginState)
                setRegisterState(false)
                console.log('log'+loginState)
            }

        }
    }
  return (
    <>
        <div className='mainDiv' >
            <div className='toggleBar'>
                <h3 className={ registerState ? "active_toolbar_class" : "unactive_toolbar_class"}  onClick={()=>handleToggleClick('reg')}>Register</h3>
                <h3 className={loginState ? "active_toolbar_class" : "unactive_toolbar_class"} onClick={()=>handleToggleClick('log')} >Login</h3>
            </div>
            </div>
            <div className='infoTab' >
                {loginState && <Login/>}
                {registerState && <Register/>}
            </div>
    </>
  )
}

export default Welcome;
import React from 'react'
import {useState, useContext} from 'react';
import './login.css'
import Header from './header'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import navigationStrings from './constants/navigationStrings';
import {authContext} from './context'
import Toast from './components/toast';
import Spinner from './components/Spinner';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setToken,setId,user,setUserType} = useContext(authContext);
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoding] = useState(false);
  const handleAdminLogin = async () => {
    if(email === 'admin' && password === 'admin'){
      setUserType('admin')
      return(<Navigate to='/admindashboard' />)
    }
  }
  const handleLogin = async () => {
    // alert(`${email} ${password}`)

    try{
        setIsLoding(true)
        const res = await axios.post(navigationStrings.urlLogin,{email,password});
        setIsLoding(false)
        await console.log(res.status);
        if(res.status === 200){
          console.log(res)
          await setToken(res.data.token)
          await setId(res.data._doc._id)
          await localStorage.setItem('token',res.data.token)
          await localStorage.setItem('id',res.data._doc._id)
          await console.log(localStorage.getItem('id'));
        }
      }
        catch(e){
          setLoginError(true)
          setTimeout(() => {
            setLoginError(false)
          }, 3000);
        
          await console.log(e);
      }
    }

  const updateEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  }
  const updatePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }
    return (
      <>
        {/* <Header/>  CHANGE THIS LATER*/}
        {isLoading && <Spinner/>}
      <Toast val={'Invalid Email or Password'} hidden={loginError?false:true}/>
        <div className='loginMain'>
            <div className='blockMain'>
                <h4  style={{marginLeft: 20, textAlign: 'center'}}>LOGIN INTO AN ACCOUNT</h4>
                <div className='inputDiv'>    
                <text className='text'>Email</text>
                <input className='inputName' type={'text'}  onChange={updateEmail} placeholder='Enter your Email'/>
                </div>
                <div className='inputDiv'>
                <text>Password</text>
                <input className='inputName' type={'text'} onChange={updatePassword} placeholder='Enter Your Password'/>
                </div>
                <div className='buttonDiv'>
                    <div className='button' onClick={handleLogin}>
                        LOGIN
                    </div>
                </div>
                <div className='buttonDiv'>
                    <div className='button' onClick={handleAdminLogin}>
                        Admin Login
                    </div>
                </div>
                   
            </div>
        </div>
        </>
  )
}

export default Login;
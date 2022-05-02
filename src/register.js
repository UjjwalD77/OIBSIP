import React, { useState } from 'react'
import './register.css'
// import Header from './header'    
import axios from 'axios';
import navigationStrings from './constants/navigationStrings';
import Toast from './components/toast';
import Spinner from './components/Spinner';

function Register() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        
        try{
            setIsLoading(true)
            const res = await axios.post(navigationStrings.urlRegister, {name,email,password});
            setIsLoading(false)
            await console.log(res);
            if(res.status === 201){
                setRegistered(true);
                setTimeout(() => {
                    setRegistered(false)
                }, 3000);
                
            }
        }
        catch(e){
            console.log(e);
        }

    }
    const updateName = (e) => {
        setName(e.target.value);
    }
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
        <>
        {isLoading && <Spinner/>}
        {/* <Header/>  CHANGE THIS LATER*/}
        <Toast  val='Verification Email sent.'  hidden={registered?false:true} />
        <div className='registerMainBlock'>
            <div className='blockMain'>
                <h4  style={{marginLeft: 20, textAlign: 'center'}}>CREATE AN ACCOUNT</h4>
                <div className='inputDiv'>
                    <div className='text'>Name</div>
                    <br/>
                    <input className='inputName' onChange={updateName} type={'text'} placeholder='Enter your Name'/>
                </div>
                <div className='inputDiv'>
                    
                <label className='text'>Email</label>
                <input className='inputName' onChange={updateEmail} type={'text'} placeholder='Enter your Email'/>
                </div>
                <div className='inputDiv'>
                <label className='text'>Password</label>
                <input className='inputName' onChange={updatePassword} type={'password'} placeholder='Enter Your Password'/>
                </div>

                <div className='buttonDiv'>
                    <div className='button' onClick={handleClick}>
                        Register
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}

export default Register;
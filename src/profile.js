import axios from 'axios';
import React from 'react'
import {useState, useEffect, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import Toast from './components/toast';
import navigationStrings from './constants/navigationStrings';
import {authContext} from './context'
import './profile.css'
function Profile() {
  const [name, setName] = useState( );
  const [email, setEmail] = useState( );
  const {id,user,setUser,setToken,setId} = useContext(authContext);
  const [curPass,setCurPass] = useState('');
  const [isChanged,setIsChanged] = useState(false);

  const handleLogOut = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setUser({})
    setToken(null);
    setId(null);
    return( <Navigate to="/" />)
  }

  const handleUpdatePassword = async() => {
    try{
      console.log(user._id);
      let res = await axios.post(navigationStrings.urlUpdatePass,{userid: user._id,password: curPass})
      if(res.status === 200){
        setIsChanged(true)
        setTimeout(() => {
          setIsChanged(false)
        }, 2000);
      }
      console.log(res);
      
    }
    catch(e){
      console.log(e)
    
    }
  }
  const handlePasswordTextUpdate = (e) => {
    setCurPass(e.target.value);
  }
  const getUserData = () => {
    try{
      console.log(user);
      setName(user.name)
      setEmail(user.email)
    }
    catch (e){
      console.log(e);
    }

  }

  useEffect(()=>{
    getUserData();
  } );
  return (
  <>
  { isChanged && <Toast val={'Password Updated'} hidden={false} />}
    <h1 style={{marginLeft: 50,borderBottom: 4,borderBottomColor: 'red', borderBottomStyle: 'solid', marginRight: 50}} >Profile</h1>
      <div className='nameRow'>
        <h3 className='name'>Name</h3>
        <input  className='nameInp' type={'text'} value={name} />
      </div>
      <div className='nameRow'>
        <h3 className='email'>Email</h3>
        <input className='emailInp' type={'text'} value={email} />
      </div>
      <div className='nameRow'>
        <h3 className='email'>Password</h3>
        <input className='emailInp' type={'text'} onChange={handlePasswordTextUpdate} />
        <div className='changePassDiv' onClick={handleUpdatePassword} >
          <h3 className='logoutext'  >  Update Password </h3>
        </div>
      </div>
    <div className='logoutDiv' onClick={handleLogOut} >
    <h3 className='logoutext'  >  Log Out </h3>
    </div>
    </>
  )
}

export default Profile;
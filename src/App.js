import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import Dashboard from './dashboard';
import Profile from './profile';
import Header from './header';
import Custom from './custom';
import Cart from './cart';
import Verify from './verify';
import Welcome from './Welcome';
import AdminDash from './admin/AdminDash';
import AdminNavbar from './admin/AdminNavbar'
import AdminOrders from './admin/AdminOrders';
import { useEffect, useState } from 'react';
import { authContext } from './context';
import axios from 'axios';
import navigationStrings from './constants/navigationStrings';
import AdminCurrentOrders from './admin/AdminCurrentOrders';
function App() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [user,setUser] = useState({})
  const [usertype,setUserType] = useState('user')
  const [cart,setCart] = useState({})
  const [order,setOrder] = useState({})
  const [pizzanames,setPizzaNames] = useState(['Capsicum Pizza','Tomato Pizza','Cheese Burst Pizza','Chicken Tikka Pizza','Chicken Pepperoni Pizza','Chicken Supreme Pizza']);
  const [pizzaPrice, setPizzaPriceCounter] = useState([300,250,399,409,595,669]);
  const getUserData = async() => {
    try{
      if(id){

        let res = await axios.post(navigationStrings.urlGetUserInfo,{id});
        if(res.status === 200){
          // let tempobj = user;
          // tempobj.name = res.data._doc_name;
          let dt= await res.data;
          await console.log(res.data,'appdatas');
          await setUser(dt);
          await console.log(user,'appUser');
        }
      }else{
        console.log('is stil null');
      }
      }
      catch (e) {
      console.log(e)
    }
  }
  const checkAlreadyLoggedIn =  async() => {
    let localToken  = localStorage.getItem('token');
    let id  = localStorage.getItem('id');
    console.log({...localStorage} );

    if(localToken && id){
        await setToken(localToken);
        await setId(id);
    }
    await getUserData();
  }
  useEffect(()=>{
    checkAlreadyLoggedIn();
  },[id]);

  if(usertype === 'admin'){
    return(
      <>
      <Header/>
      <AdminNavbar/>
      <authContext.Provider value={{token,setToken,id,setId,user,setUserType}}>
        {/* <Welcome/> */}
          <Routes>
          <Route  exact path = "/" element={<AdminDash/>}/>
          <Route path = "/currentorders" element={<AdminCurrentOrders/>}/> 
          <Route path = "/orders" element={<AdminOrders/>}/> 
            {/* <Route path = "/profile" element={<Navigate to='/'/>}/>  */}
          </Routes>
      </authContext.Provider>
      </>
    )
  }
  else{

    if(!token){
      return(
      <>
      <Header/>
      <authContext.Provider value={{token,setToken,id,setId,user,setUserType}}>
        {/* <Welcome/> */}
          <Routes>
          <Route  exact path = "/" element={<Welcome/>}/>
            <Route path = "/verify" element={<Verify/>}/> 
            <Route path = "/profile" element={<Navigate to='/'/>}/> 
          </Routes>
      </authContext.Provider>
      </>
    )
  }
  else{
    
    return (
      <>
      <authContext.Provider value={{token,setToken,id,setId,user,setUser,cart,setCart,pizzaPrice,pizzanames,order,setOrder}}>
      <Header/>
      <Navbar/> 
      <Routes>
        <Route exact path = "/" element={<Home/>}/>
        <Route path = "/dashboard" element={<Dashboard/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        <Route path = "/cart" element={<Cart/>}/>
        <Route path = "/custom" element={<Custom/>}/> 
        <Route path = "/verify" element={<Verify/>}/>
        {/* <Route path = "/Register" element={<Register/>}/> */}
        {/* <Route path = "/Login" element={<Login/>}/> */}
        {/* <Route path = "/Welcome" element={<Welcome/>}/> */}
      </Routes>
    </authContext.Provider>
    </>
 
 );
}
}
}

export default App;

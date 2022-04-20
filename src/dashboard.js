import axios from 'axios';
import React from 'react'
import {useState,useContext,useEffect,useMemo} from 'react'
import navigationStrings from './constants/navigationStrings';
import { authContext } from './context';
import './dashboard.css'


function Dashboard() {
  const {order,setOrder} = useContext(authContext)
  const [orderitems,setOrderItems] = useState([]);
  const [completeOrder, setCompleteOrder] = useState({});
  // console.log(order)
  let orderitemslocal = [];




  const refreshCurrentOrderStatus = async(completeOrder) => {
    const newCompleteOrderlocal = await axios.post(navigationStrings.urlGetOrder,{'orderId':order[1]['orderId']})
    if(JSON.stringify(completeOrder) !== JSON.stringify(newCompleteOrderlocal.data)){
      //objects are the same
      console.log(completeOrder);
      console.log('Objects dont match apparently');
      console.log(newCompleteOrderlocal.data);
      await setCompleteOrder(newCompleteOrderlocal.data);
    }
    else{
      console.log('Objects DO be matching');
    }
    // if(completeOrder !== newCompleteOrderlocal.data){
    //   console.log('Objects dont match apparently');
    //   setCompleteOrder(newCompleteOrderlocal.data);
    // }
    
  }
  const CurrentOrderStatus = async() => {
    let res = await axios.post(navigationStrings.urlGetOrder,{'orderId':order[1]['orderId']})
    console.log(res)
    await setCompleteOrder(res.data);
    
  }
  const StatusComponent = () => {
    return(
      <>
        <h1 style={{borderBottom: 3, borderBottomColor:'red', borderBottomStyle:'solid'}} >Order Details:</h1>
          <h3  style={{padding: 5,fontSize:22}} >Order ID: {completeOrder.orderId}</h3>
          <div style={{display: 'flex',flexDirection:'row'}}>
          <h3  style={{padding: 5,fontSize:22}} >Current Order Status:</h3> <h3 style={{backgroundColor:'red',color:'white',fontSize: 22,padding:5,width:'fit-content'}}> {completeOrder.status}</h3>
          </div>

      </>
    )
  }
  const Getorderitems = () => {
    for (const key in order[0]) {
      if(key === 'custom'){
        orderitemslocal.push(<h3>Custom Pizza</h3>);
        for (const key in order[0]['custom']) {
            orderitemslocal.push(<h3 className='orderitems'>{key}: {order[0]['custom'][key]}</h3>);
        }
      }
      else{
        orderitemslocal.push(<h3 className='orderitems' >{key}: {order[0][key]}</h3>);
      }
    }
    orderitemslocal.push(<h3 style={{backgroundColor:'black',color:'white',fontSize: 22,padding:5}}> Amount Payed: ₹{completeOrder.amount} </h3>);
  }
  // setInterval(() => {
  //   refreshCurrentOrderStatus()
  // },5000 );
  useEffect(()=>{
    CurrentOrderStatus();
    const intervalCall = setInterval(() => {
      refreshCurrentOrderStatus(completeOrder)
    }, 3000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  },[])
  Getorderitems()
  return (
    <>
      <div className='dashDivMain'>
        <div className='dashDiv2Main' >
          <div className='dashDiv2' >
            <h1 style={{borderBottom: 3, borderBottomColor:'red', borderBottomStyle:'solid'}} >Current Order:</h1>
            {orderitemslocal}
          </div>
          <div className='dashDiv3' >
            
            <StatusComponent/>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Dashboard;
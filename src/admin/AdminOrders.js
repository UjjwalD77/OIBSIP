import axios from 'axios'
import React, { useEffect, useState } from 'react'
import navigationStrings from '../constants/navigationStrings'
import './AdminOrders.css'
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import Toast from '../components/toast'

const AdminOrders = () => {
    const [outerArr, setOuterArr] = useState([]);
    const [orderIdArr,setOrderIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [orderStatusArr, setOrderStatusArr] = useState([]);
    const [orderTimeArr, setOrderTimeArr]  = useState([]);
    const [buttonArr, setButtonArr] = useState([]);
    const [amountArr, setAmountArr] = useState([]);
    const [tempValues, setTempVal] = useState({});
    const [showToast,setShowToast] = useState(false);
    
    let orderidarr = [];
    let namearr = [];
    let ordstatusarr = [];
    let ordertimearr = [];
    let buttonarr = [];
    let amountarr = [];
    let tempvalues = {};
    
    
    function StatusDropDown(props) {        
       
        return(
            <div className='ddlmain'  >
                <h3 className='ddlcurval'>
                    {tempvalues[props.orderId] ? [tempvalues[props.orderId]]:  props.status}
                    <div className='iconDiv'>

                    </div>
                </h3>
                {/* !listIsOpen ? <StatusDropDownInner/> : <>TO</> */}
            </div>
        )
        
    }
// useEffect(()=>{
//     console.log(listIsOpen);
// },[listIsOpen])
    
    const updatedata = async()=>{
        orderidarr = [];
        tempvalues = [];
        buttonarr = [];
        ordstatusarr = [];
        try{

            const res = await axios.post(navigationStrings.urlGetOrder);
            if(res.status === 200){
                console.log(res.data);
                for (const key in res.data) {
                    if (Object.hasOwnProperty.call(res.data, key)) {
                        const element = res.data[key];
                        for (const key in element) {    
                            if (Object.hasOwnProperty.call(element, key)) {
                                const innerele = element[key];
                                if(key === 'orderId'){
                                    orderidarr.push(<h3>{innerele}</h3>)
                                    tempvalues = {...tempvalues, [innerele] : element['status'] }
                                }
                                else if (key === 'status'){
                                    ordstatusarr.push(<StatusDropDown status={innerele} orderId={element['orderId']} />)
                                }
                            }
                        }
                        
                    }
                }
            }
            setOrderIdArr(orderidarr);
            setOrderStatusArr(ordstatusarr);
            setTempVal(tempvalues);
        }
        catch(e){
            console.log(e);
        }

    }
    const getorders = async()=>{
        try{

            const res = await axios.post(navigationStrings.urlGetOrder);
            if(res.status === 200){
                console.log(res.data);
                for (const key in res.data) {
                    if (Object.hasOwnProperty.call(res.data, key)) {
                        const element = res.data[key];
                        for (const key in element) {    
                            if (Object.hasOwnProperty.call(element, key)) {
                                const innerele = element[key];
                                if(key === 'orderId'){
                                    orderidarr.push(<h3>{innerele}</h3>)
                                    tempvalues = {...tempvalues, [innerele] : element['status'] }
                                }
                                else if (key === 'user'){
                                    namearr.push(<h3>{innerele["name"]}</h3>)
                                }
                                else if (key === 'amount'){
                                    amountarr.push(<h3>{innerele} Rs</h3>)
                                }
                                else if (key === 'status'){
                                    ordstatusarr.push(<StatusDropDown status={innerele} orderId={element['orderId']} />)
                                }
                                else if (key === 'createdAt'){
                                    ordertimearr.push(<h3>{innerele}</h3>)
                                }
                            }
                        }
                        
                    }
                }
            }
            setOrderIdArr(orderidarr);
            setNameArr(namearr);
            setOrderStatusArr(ordstatusarr);
            setOrderTimeArr(ordertimearr);
            setButtonArr(buttonarr);
            setAmountArr(amountarr);
            setTempVal(tempvalues);
        }
        catch(e){
            console.log(e);
        }

    }

useEffect(()=> {
    getorders()
},[])

useEffect(()=>{
    const intervalCall = setInterval(() => {
        updatedata()
    }, 7000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  },[])
    return (
        <>
        {showToast && <Toast val={'Status Updated'} hidden={false}/>}
        <h1 style={{textAlign: 'center'}}>All Orders</h1>
            <div className='admincurordersmain' >
                <div className='admincurorderscolnames'>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Order ID</h3>
                            <div className='columnval'>
                                {orderIdArr}
                            </div>
                        
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Cust Name</h3>
                            <div className='columnval'>
                                {nameArr}
                            </div>
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Order Status</h3>
                            <div className='columnval'>
                                {orderStatusArr}
                                {/* <StatusDropDown/> */}
                            </div>
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Order Amount</h3>
                            <div className='columnval'>
                                {amountArr}
                            </div>
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Recieved Time</h3>
                            <div className='columnval'>
                                {orderTimeArr}
                            </div>
                        </div>
                    
                </div>
            </div>
        </>
    )
}

export default AdminOrders
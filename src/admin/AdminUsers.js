import axios from 'axios'
import React, { useEffect, useState } from 'react'
import navigationStrings from '../constants/navigationStrings'
import './AdminUsers.css'
import Toast from '../components/toast'
import Spinner from '../components/Spinner'


const AdminUsers = () => {
    const [outerArr, setOuterArr] = useState([]);
    const [userIdArr,setUserIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [emailArr, setEmailArr] = useState([]);
    const [accountCreatedArr, setAccountCreatedArr]  = useState([]);
    const [buttonArr, setButtonArr] = useState([]);
    const [orderCountArr, setOrderCountArr] = useState([]);
    const [tempValues, setTempVal] = useState({});
    const [showToast,setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    let useridarr = [];
    let namearr = [];
    let emailarr = [];
    let accountcreatedarr = [];
    let buttonarr = [];
    let ordercount = [];
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
        buttonarr = [];
        ordercount = [];
        try{

            const res = await axios.post(navigationStrings.urlGetUserInfo,{type: 'all'});
            if(res.status === 200){
                console.log(res.data);
                for (const key in res.data) {
                    if (Object.hasOwnProperty.call(res.data, key)) {
                        const element = res.data[key];
                        for (const key in element) {    
                            if (Object.hasOwnProperty.call(element, key)) {
                                const innerele = element[key];
                                if (key === 'count'){
                                    ordercount.push(<h3>{innerele}</h3>)
                                }
                            }
                        }
                        
                    }
                }
            }

            setOrderCountArr(ordercount);
        }
        catch(e){
            console.log(e);
        }

    }
    const getorders = async()=>{
        try{
            await setIsLoading(true)
            const res = await axios.post(navigationStrings.urlGetUserInfo,{type: 'all'});
            await setIsLoading(false)    
            if(res.status === 200){
                console.log(res.data);
                for (const key in res.data) {
                    if (Object.hasOwnProperty.call(res.data, key)) {
                        const element = res.data[key];
                        for (const key in element) {    
                            if (Object.hasOwnProperty.call(element, key)) {
                                const innerele = element[key];
                                if(key === '_id'){
                                    useridarr.push(<h3>{innerele}</h3>)
                                    tempvalues = {...tempvalues, [innerele] : element['status'] }
                                }
                                else if (key === 'name'){
                                    namearr.push(<h3>{innerele}</h3>)
                                }
                                else if (key === 'email'){
                                    emailarr.push(<h3>{innerele}</h3>)
                                }
                                else if (key === 'count'){
                                    ordercount.push(<h3>{innerele}</h3>)
                                }
                                // else if (key === 'status'){
                                //     ordstatusarr.push(<StatusDropDown status={innerele} orderId={element['orderId']} />)
                                // }
                                else if (key === 'createdAt'){
                                    // accountcreatedarr.push(<h3>Today</h3>)
                                    accountcreatedarr.push(<h3>{innerele}</h3>)
                                }
                            }
                        }
                        
                    }
                }
            }
            setUserIdArr(useridarr);
            setNameArr(namearr);
            setEmailArr(emailarr);
            setAccountCreatedArr(accountcreatedarr);
            // setButtonArr(buttonarr);
            setOrderCountArr(ordercount);
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
        {isLoading && <Spinner/>}
        {showToast && <Toast val={'Status Updated'} hidden={false}/>}
        <h1 style={{textAlign: 'center'}}>Users</h1>
            <div className='admincurordersmain' >
                <div className='admincurorderscolnames'>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>User ID</h3>
                            <div className='columnval'>
                                {userIdArr}
                            </div>
                        
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Cust Name</h3>
                            <div className='columnval'>
                                {nameArr}
                            </div>
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Email</h3>
                            <div className='columnval'>
                                {emailArr}
                                {/* <StatusDropDown/> */}
                            </div>
                        </div>
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Orders Placed</h3>
                            <div className='columnval'>
                                {orderCountArr}
                            </div>
                        </div>
                    <div className='columnname'>    
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Account Created</h3>
                            <div className='columnval'>
                                {accountCreatedArr}
                            </div>
                        </div>
                            
                    </div>
                </div>
        </>
    )
}

export default AdminUsers
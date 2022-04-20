import axios from 'axios'
import React, { useEffect, useState } from 'react'
import navigationStrings from '../constants/navigationStrings'
import './AdminCurrentOrders.css'
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import Toast from '../components/toast'

const AdminCurrentOrders = () => {
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
        const [listIsOpen, setListIsOpen] = useState(false);
        const [listVals,setListVal] = useState(['Order Recieved','Being Prepared','Out for Delivery']);

        const handleUpdate = (val) => {
            // console.log('before');
            // console.log(tempValues)
            // let tempupdateobj = tempValues;
            // tempupdateobj[props.orderId] = val; 
            // console.log(tempupdateobj);
            // setTempVal(tempupdateobj)
            let tempupdateobj = tempvalues;
            tempupdateobj[props.orderId] = val; 
            console.log(tempupdateobj);
            
        }
        const StatusDropDownInner = () => {
            return(
                <div className='listmain' onClick={()=> setListIsOpen(listIsOpen=>!listIsOpen)} >
                    {listVals.map(val=>{
                        return(val === props.status? <><div className='listval' onClick={()=>{handleUpdate(val)}} >{val}</div></>: <><div className='listvalselected'  onClick={()=>{handleUpdate(val)}} >{val}</div></>)
                    })}  
                </div>
            )
        }
        return(
            <div className='ddlmain'  >
                <h3 className='ddlcurval' onClick={()=>setListIsOpen(listIsOpen=>!listIsOpen)}  >
                    {tempvalues[props.orderId] ? [tempvalues[props.orderId]]:  props.status}
                    <div className='iconDiv'>

                    <IoIosArrowDropdownCircle />
                    </div>
                </h3>
                    {listIsOpen && <StatusDropDownInner />}
                {/* !listIsOpen ? <StatusDropDownInner/> : <>TO</> */}
            </div>
        )
        
    }
// useEffect(()=>{
//     console.log(listIsOpen);
// },[listIsOpen])
    const UpdateButton = (props)=> {
        console.log('button clicked')
        const handleUpdateClick = async()=>{
            console.log('click')
            try{
                const result = await axios.post(navigationStrings.urlUpdateOrder,{orderId: props.orderId, status: tempvalues[props.orderId] })
                console.log(result)
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                }, 3000);
            }
            catch(e){

            }


        }
        return(
            <h3 className='updateOrderButtonDiv' onClick={handleUpdateClick}>
                    {props.text}
            </h3>
        )
    }
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
                        buttonarr.push(<UpdateButton text={'Update'}  orderId={element['orderId']}/>)
                    }
                }
            }
            setOrderIdArr(orderidarr);
            setOrderStatusArr(ordstatusarr);
            setButtonArr(buttonarr);
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
                        buttonarr.push(<UpdateButton text={'Update'}  orderId={element['orderId']}/>)
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
    }, 3000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  },[])
    return (
        <>
        {showToast && <Toast val={'Status Updated'} hidden={false}/>}
        <h1 style={{textAlign: 'center'}}>Current Orders</h1>
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
                    <div className='columnname'>
                        <h3 style={{borderBottom: 7, borderBottomColor:'red', borderBottomStyle: 'solid'}}>Update</h3>
                            <div className='columnval'>
                                {buttonArr}
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default AdminCurrentOrders
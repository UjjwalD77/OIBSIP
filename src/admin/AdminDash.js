import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios'
import Spinner from '../components/Spinner';
import {AiOutlineClose} from 'react-icons/ai'
import navigationStrings from '../constants/navigationStrings';
require('./AdminDash.css')

function AdminDash() {

  const [isLoading, setIsLoading] = useState([])
  const [baseObj,setBaseObj] = useState([])
  const [sauceObj,setSauceObj] = useState([])
  const [cheeseObj, setCheeseObj] = useState([])
  const [toppingObj, setToppingObj] = useState([])
  const [baseArr,setBaseArr] = useState([])
  const [sauceArr,setSauceArr] = useState([])
  const [cheeseArr, setCheeseArr] = useState([])
  const [toppingArr, setToppingArr] = useState([])
  const [showButton1,setShowButton1] = useState(false);
  const [showButton2,setShowButton2] = useState(false);
  const [showButton3,setShowButton3] = useState(false);
  const [showButton4,setShowButton4] = useState(false);
  let basearr = [];
  let saucearr = [];
  let cheesearr = [];
  let toppingarr = [];
  let baseobj = [];
  let sauceobj = [];
  let cheeseobj = [];
  let toppingobj = [];

  const UpdateInnerButtonDash = () => {
    return(
      <div className='updateInnerButtonMain' >
        Update Inventory
      </div>
    )
  }
  const AdminDashButton = (props) =>{
    return(
      <div className='dashButtonMain' >
        <div className='dashButtonInner'>
        <div className='dashButtonHeader'>
          <div className='dashButtonCloseHeader'>
            <AiOutlineClose size={40} color={'white'} onClick={()=>{
              setShowButton1(false)
              setShowButton2(false)
              setShowButton3(false)
              setShowButton4(false)
            }} />
          </div>
        </div>
          {props.item === 'base' && baseObj}
          {props.item === 'sauce' && sauceObj}
          {props.item === 'cheese' && cheeseObj}
          {props.item === 'topping' && toppingObj}
        </div>
      </div>
    )
    
  }

  const updatearr = (src,addkey,addval) =>{
    let tempobj = {...src, [addkey]: addval}
    console.log(tempobj);
    return tempobj;
  }
  const getInv = async()=>{
    try{
      setIsLoading(true)
      let curData = await axios.post(navigationStrings.urlGetInv,{type:'get'})
      setIsLoading(false)
      // console.log(curData);
      curData.data.map((data,index)=>{
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if(data['item'] === 'base'){
              if(key !== '_id' && key !== 'item'){
                let newkey = key.toUpperCase();
                basearr.push(<h4>{newkey}: {element}</h4>)
                baseobj.push(<h3>{newkey}<input type={'text'} className="adminDashInpBox" defaultValue={element} ></input></h3>)

              }
            }
            else if(data['item'] === 'sauce'){
              if(key !== '_id' && key !== 'item'){
                let newkey = key.toUpperCase();
              saucearr.push(<h4>{newkey}: {element}</h4>)
              sauceobj.push(<h3>{newkey}<input type={'text'} className="adminDashInpBox" defaultValue={element} ></input></h3>)
              }
            }
            else if(data['item'] === 'cheese'){
              if(key !== '_id' && key !== 'item'){
                let newkey = key.toUpperCase();
              cheesearr.push(<h4>{newkey}: {element}</h4>)
              cheeseobj.push(<h3>{newkey}<input type={'text'} className="adminDashInpBox" defaultValue={element} ></input></h3>)

            }
          }
            else if(data['item'] === 'topping'){
              if(key !== '_id' && key !== 'item'){
                let newkey = key.toUpperCase();
              toppingarr.push(<h4>{newkey}: {element}</h4>)
              toppingobj.push(<h3>{newkey}<input type={'text'} className="adminDashInpBox" defaultValue={element} ></input></h3>)

            } 
          }
        }
      }
      
    })
      baseobj.push(<UpdateInnerButtonDash/>)
      sauceobj.push(<UpdateInnerButtonDash/>)
      cheeseobj.push(<UpdateInnerButtonDash/>)
      toppingobj.push(<UpdateInnerButtonDash/>)
      await console.log(basearr)
      setBaseArr(basearr)
      setSauceArr(saucearr)
      setToppingArr(toppingarr)
      setCheeseArr(cheesearr)
      setBaseObj(baseobj)
      setSauceObj(sauceobj)
      setCheeseObj(cheeseobj)
      setToppingObj(toppingobj)
    }
    catch(error){
      console.log(error);
    }
  }
useEffect(()=>{
  getInv()
},[]);


  return (
    <>
    {isLoading && <Spinner/>}
    {showButton1 && <AdminDashButton item={'base'} />}
    {showButton2 && <AdminDashButton item={'sauce'} />}
    {showButton3 && <AdminDashButton item={'cheese'} />}
    {showButton4 && <AdminDashButton item={'topping'} />}
    <h1 style={{textAlign: 'center', paddingBottom: 20}} >Inventory</h1>
    <div className='divDashMain' >
      <div className='divDashBlock' >
        <div className='divDashBlockHeader' >
          Base
        </div>
        <div className='divDashBlockBody'>
          {baseArr}
        </div>
        <div className='updateButton' onClick={()=> {setShowButton1(showButton1=> !showButton1)}} >
          Update
        </div>

      </div>
      <div className='divDashBlock' >
        <div className='divDashBlockHeader' >
          Sauce
        </div>
        <div className='divDashBlockBody'>
          {sauceArr}
        </div>
        <div className='updateButton' onClick={()=> {setShowButton2(showButton2=> !showButton2)}} > 
          Update
        </div>
      </div>
      <div className='divDashBlock' >
        <div className='divDashBlockHeader' >
          Cheese
        </div>
        <div className='divDashBlockBody'>
          {cheeseArr}
        </div>
        <div className='updateButton' onClick={()=> {setShowButton3(showButton3=> !showButton3)}} > 
          Update
        </div>
      </div>
      <div className='divDashBlock' >
        <div className='divDashBlockHeader' >
          Toppings
        </div>
        <div className='divDashBlockBody'>
          {toppingArr}
        </div>
        <div className='updateButton' onClick={()=> {setShowButton4(showButton4=> !showButton4)}} > 
          Update
        </div>
      </div>
      
      
    </div>
    </>
  )
}

export default AdminDash
import React, { useContext } from 'react'
import './custom.css';
import {useState, useEffect} from "react";
import Toast from './components/toast';
import { authContext } from './context';
const pizzaBase = require('./images/cheesestuffedcrust.jpeg');

function Custom() {
  const [showBase,setShowBase] = useState(false);
  const [showSauce,setShowSauce] = useState(false);
  const [showCheese,setShowCheese] = useState(false);
  const [showToppings,setShowToppings] = useState(false);
  const [customPicks, setCustomPicks] = useState([-1,-1,-1,[-1,-1,-1,-1,-1]]);
  const [missedOption, setMissedOption] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const {cart,setCart} = useContext(authContext);
  const baseNames = ['Basic Base','Thin Crust Base','Cheese Crust Base','Veg Kebab Base','Chicken Masala Crust'];
  const sauceNames = ['Pesto Sauce','Salsa Sauce','BBQ Sauce','Mayonnaise Sauce','Alfredo Sauce']
  const cheeseNames = ['Mozzarella Cheese','Cheddar Cheese','Parmesan Cheese','Ricotta Cheese','Goat Cheese']
  const toppingsName = ['Pepperoni','Mushroom','Extra Cheese','Black Olives','Tomato']
  
  const handleAddToCart = () => {
    
    //validating entries
    for(let i = 0; i<3; i++){
      if(customPicks[i] === -1){
          setMissedOption(true);

          setTimeout(() => {
            setMissedOption(false)
          }, 2000);
          return;
        }
      }
      setShowBase(false)
      setShowCheese(false)
      setShowSauce(false)
      setShowToppings(false)

      let tempcart = cart;
      let tempToppingsList=[];
      customPicks[3].forEach((ele,index)=>{
        if(ele != -1){
          // console.log(toppingsName[index] + "sffd");
          // [toppingsName[index]]
          tempToppingsList.push(toppingsName[index]);
        }
      })
      // tempcart = {...tempcart, 'custom':{'base':'2','sauce': 'hot Sauce'}}
      tempcart = {...tempcart, 'custom':{'base': baseNames[customPicks[0]], 'sauce': sauceNames[customPicks[1]], 'cheese': cheeseNames[customPicks[2]],
      'toppings': tempToppingsList}}
      console.log(tempcart)

      setCart(tempcart)

      setAddedToCart(true)
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000);
      
  }
  const handleAddToCart2 = () => {
    
    //validating entries

      setShowBase(false)
      setShowCheese(false)
      setShowSauce(false)
      setShowToppings(false)

      let tempcart = cart;
      let tempToppingsList=[];
      customPicks[3].forEach((ele,index)=>{
        if(ele != -1){
          // console.log(toppingsName[index] + "sffd");
          // [toppingsName[index]]
          tempToppingsList.push(toppingsName[index]);
        }
      })
      // tempcart = {...tempcart, 'custom':{'base':'2','sauce': 'hot Sauce'}}
      tempcart = {...tempcart, 'custom':{'base': 'Basic Base', 'sauce': 'BBQ Sauce', 'cheese': 'Goat Cheese',
      'toppings': ['Mushroom','Extra Cheese']}}
      console.log(tempcart)

      setCart(tempcart)

      setAddedToCart(true)
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000);
      
  }
  const updateArr = (index,val,innerarr) => {
    if(innerarr===0 || innerarr <200){
      let tempArr = customPicks;
      if(tempArr[index][innerarr] === 1){
        tempArr[index][innerarr] = -1;
      }
      else{

        tempArr[index][innerarr] = val;
      }
      setCustomPicks([...tempArr]);
      console.log(customPicks);
    }
    else{
      
      let tempArr = customPicks;
      tempArr[index] = val;
      setCustomPicks([...tempArr]);
      console.log(customPicks);
    }
  }
  
  
  const Base = () => {
    return(
         
      <div className='pickBaseInner'>
        <img className={customPicks[0]=== 0?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/frozen-pizza-base-or-dough-picture-id878423272?k=20&m=878423272&s=612x612&w=0&h=cRO2krDTJ5xAM3jeneUDpSuzPDZm8ok4k7hFWnMF6b8='} alt='OOPs'height={200} onClick={()=>updateArr(0,0)}/>
        <img className={customPicks[0]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/cheese-pizza-in-a-cardboard-box-closeup-picture-id1246548191?k=20&m=1246548191&s=612x612&w=0&h=1pvEQk8U3cm0D1w2e91ZQLqrIYey74YW7FwToVLOAXw='} alt='OOPs'height={200} onClick={()=>updateArr(0,1)} />
        <img className={customPicks[0]=== 2?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/pizza-margarita-with-mozzarella-cheese-basil-and-tomato-template-for-picture-id905492462?k=20&m=905492462&s=612x612&w=0&h=CKE5-AxyCwpvEnK8V46_M6Ml4gljFgX0eFfG_M83XjQ='} alt='OOPs'height={200} onClick={()=>updateArr(0,2)} />
        <img className={customPicks[0]=== 3?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/autumn-comfort-food-wholegrain-raw-pizza-with-eggplant-on-baking-picture-id1067084728?k=20&m=1067084728&s=612x612&w=0&h=yjzgO635Y4jgmTCgmOH4VEAU4Ir08kNg8PRcJg700LM='} alt='OOPs'height={200} onClick={()=>updateArr(0,3)} />
        <img className={customPicks[0]=== 4?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/fresh-italian-classic-original-pizza-isolated-on-white-background-picture-id1220551253?k=20&m=1220551253&s=612x612&w=0&h=LiPgh6GZ13JoBfGIBPLiLex7zsYJuwreyIRNZ_uD7sI='} alt='OOPs'height={200} onClick={()=>updateArr(0,4)} />
      </div>
    )
  }
  const Sauce = () => {
    return(
      <div className='pickBaseInner'>
        <img className={customPicks[1]=== 0?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/sauced-picture-id490634326?k=20&m=490634326&s=612x612&w=0&h=NxeJh4b8RVYtWpz1prHkVIOKT9Lk41tyZeFikQgmRk4='} alt='OOPs'height={200} onClick={()=>updateArr(1,0)} />
        <img className={customPicks[1]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/roman-square-flatbread-pizza-with-tuna-fresh-green-basil-leaves-on-picture-id1311410496?k=20&m=1311410496&s=612x612&w=0&h=XD_eOkr-KmBaUWCjaKogNX4tr1rPhIRUAl6O-fz0E4Y='} alt='OOPs'height={200} onClick={()=>updateArr(1,1)} />
        <img className={customPicks[1]=== 2?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/pizzeria-food-bbq-pizza-picture-id1214146058?k=20&m=1214146058&s=612x612&w=0&h=RfrBPsfAXvg_O-8t6pwj1LDojttkkwBr02UP_n4jJF4='} alt='OOPs'height={200} onClick={()=>updateArr(1,2)} />
        <img className={customPicks[1]=== 3?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/two-pizzas-in-a-cardboard-box-on-a-light-background-top-view-pizza-picture-id1268288120?k=20&m=1268288120&s=612x612&w=0&h=nt_h3vvnQ4ERKwD5I8A0AZK5zWXzuKLHSGIdXmG0F6k='} alt='OOPs'height={200} onClick={()=>updateArr(1,3)} />
        <img className={customPicks[1]=== 4?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/grilled-chicken-and-roasted-pepper-pizza-picture-id1191354097?k=20&m=1191354097&s=612x612&w=0&h=jcdIOWNR2gMDe9ad_UePoxGGSXygrzls7wacf20L0SI='} alt='OOPs'height={200} onClick={()=>updateArr(1,4)} />
      </div>
    )
  }
  const Cheese = () => {
    return(
      <div className='pickBaseInner'>
        <img className={customPicks[2]=== 0?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/slice-of-hot-pizza-picture-id519526540?k=20&m=519526540&s=612x612&w=0&h=15B_SmDQBBp-hnrNSwurEAVfS_IYlqwFoL0VcVYhIjU='} alt='OOPs'height={200} onClick={()=>updateArr(2,0)} />
        <img className={customPicks[2]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/pepperoni-and-four-cheese-pizzas-picture-id1197848673?k=20&m=1197848673&s=612x612&w=0&h=4K6xYwDBQPVXQP_aCeVrbDbBUoCtKxHK2qNANA2lOQA='} alt='OOPs'height={200} onClick={()=>updateArr(2,1)} />
        <img className={customPicks[2]=== 2?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=20&m=938742222&s=612x612&w=0&h=X5AlEERlt4h86X7U7vlGz3bDaDDGQl4C3MuU99u2ZwQ='} alt='OOPs'height={200} onClick={()=>updateArr(2,2)} />
        <img className={customPicks[2]=== 3?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/organic-spinach-and-ricotta-pizza-picture-id157433818?k=20&m=157433818&s=612x612&w=0&h=3Nv6SUxaS4M_ysvbqaKuan7Ga5gHofwjlRgh9-XtO0U='} alt='OOPs'height={200} onClick={()=>updateArr(2,3)} />
        <img className={customPicks[2]=== 4?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/italian-pizza-four-cheese-on-wooden-cutting-board-close-up-picture-id1098003666?k=20&m=1098003666&s=612x612&w=0&h=R8RPySoFUdw5huIhbOdhamHGALd-MZ4Ixkscc2BWCHQ='} alt='OOPs'height={200} onClick={()=>updateArr(2,4)} />
      </div>
    )
  }
  const Toppings = () => {
    return(
      <div className='pickBaseInner'>
        <img className={customPicks[3][0]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/oven-baked-pepperoni-pizza-picture-id1181651561?k=20&m=1181651561&s=612x612&w=0&h=iDsz2My1q-kWdouyPBCXL6Up6iInM_J-9X1cKAh1OVA='} alt='OOPs'height={200} onClick={()=>updateArr(3,1,0)} />
        <img className={customPicks[3][1]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/gourmet-homemade-mushroom-pizza-picture-id864768956?k=20&m=864768956&s=612x612&w=0&h=8QNPyRF6NDfvO3VIZVpMO8f0Bun5ZEXu4MAYxlSvtZo='} alt='OOPs'height={200} onClick={()=>updateArr(3,1,1)} />
        <img className={customPicks[3][2]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/pizza-margharita-picture-id184970966?k=20&m=184970966&s=612x612&w=0&h=emIxg2xa7ayCFBXQbpCs1Rc8uf1vqEKHaPEg-RZZ274='} alt='OOPs'height={200} onClick={()=>updateArr(3,1,2)} />
        <img className={customPicks[3][3]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/hot-steaming-pizza-in-oven-picture-id603873220?k=20&m=603873220&s=612x612&w=0&h=w8zBJYQdony5nx7YEMsFYWDG-iYY4pdrF51x6nu5Gno=  '} alt='OOPs'height={200} onClick={()=>updateArr(3,1,3)} />
        <img className={customPicks[3][4]=== 1?'pizzaImgSelected': 'pizzaImg'} src={'https://media.istockphoto.com/photos/pizza-picture-id181175167?k=20&m=181175167&s=612x612&w=0&h=9GG7ul76f-Kly2aLMgIqYf37csf91uN4_QyOmQKUWKI='} alt='OOPs'height={200} onClick={()=>updateArr(3,1,4)} />
      </div>
    )
  }
  
    let selectedPicks = new Array();
    
    return (
    
    <>
    <h3 style={{marginLeft: 20}}>Customize your order</h3>
    {missedOption && <Toast val={'Please choose from all the categories'} hidden={false}/> }
    {addedToCart && <Toast val={'Added to Cart'} hidden={false}/> }
    <div className='maincusDiv'>
      <div className='pickBase' onClick={(event)=> {if(event.target === event.currentTarget){setShowBase(showBase => !showBase)}}}>
          Choose a Base  
          { customPicks[0]!==-1 && <text style={{letterSpacing: 0, backgroundColor: 'black', padding: 10, marginBottom: 10}}>{baseNames[customPicks[0]]}</text>}
        {showBase && <Base/>}
      </div>  
      <div className='pickBase' onClick={(event)=> {if(event.target === event.currentTarget) setShowSauce(showSauce => !showSauce)}}>
          Choose a Sauce
          { customPicks[1]!==-1 && <text style={{letterSpacing: 0, backgroundColor: 'black', padding: 10, marginBottom: 10}}>{sauceNames[customPicks[1]]}</text>}
        {showSauce && <Sauce/>}
      </div>  
      <div className='pickBase' onClick={(event)=> {if(event.target === event.currentTarget) setShowCheese(showCheese => !showCheese)}}>
          Choose a Cheese
          { customPicks[2]!==-1 && <text style={{letterSpacing: 0, backgroundColor: 'black', padding: 10, marginBottom: 10}}>{cheeseNames[customPicks[2]]}</text>}
        {showCheese && <Cheese/>}
      </div>  
      <div className='pickBase' onClick={(event)=> {if(event.target === event.currentTarget) setShowToppings(showToppings => !showToppings)}}>
          Toppings<text style={{letterSpacing:0}}>(optional)</text>
          { (customPicks[3][0]!==-1 || customPicks[3][1]!==-1 || customPicks[3][2]!==-1 || customPicks[3][3]!==-1 || customPicks[3][4]!==-1   ) && <text style={{letterSpacing: 0, backgroundColor: 'black', padding: 10, marginBottom: 10}}>{
            customPicks[3].map((item,index) => {
            // console.log(item);
            if(item === 1){
              console.log(index);
              // console.log(toppingsName[customPicks[3].indexOf(item)] );
              // return(toppingsName[customPicks[3].indexOf(item)] );
              selectedPicks.push(toppingsName[index]);
            }
          },
          )  
        }
        {selectedPicks.map((item,index)=>{
          if(index !== selectedPicks.length-1){
            console.log(item)
            return(item + ',')
          }
          else {
            return(item)
          }
        })}
        </text>}
        {showToppings && <Toppings/>}
      </div>  
      <div className='addToCart' onClick={handleAddToCart} >Add to Cart</div>
    </div>
    </>
  )
}

export default Custom;
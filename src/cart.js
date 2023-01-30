import React, { useState } from 'react'
import './cart.css'
import {authContext} from './context'
import {useContext} from 'react'
import axios from 'axios'
import Toast from './components/toast'
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers'
import navigationStrings from './constants/navigationStrings'

function Cart() {
  const {cart,setCart,pizzaPrice,pizzanames,user,setOrder} = useContext(authContext);
  let totalCartPrice = 0;
  const [currencyused,setCurrencyUsed] = useState("INR");
  const [orderSuccessful, setOrderSuccessful] = useState(false);

  
  const handleSuccessfulPayment = async(result) =>{
    try{
      let res = await axios.post(navigationStrings.urlPaymentOrderStore,{'amount':totalCartPrice,'currency':currencyused,'orderId': result.data.orderId,'paymentId': result.data.paymentId,'user':user._id})
      console.log(res);
    }
    catch(e){
      console.log(e);
    }
    // console.log(totalCartPrice + " " + currencyused + " " +  result.data.orderId +" " + result.data.paymentId + " " + user._id)
  }
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}   
async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await axios.post(navigationStrings.urlPaymentOrder,{},{ headers:{'amount': totalCartPrice}});
  setCurrencyUsed(result.data.currency)  
  console.log(currencyused)  

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_wsXu7qi5QwR4hA", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Ujjwal Tech",
      description: "Pizza payment",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(navigationStrings.urlPaymentOrderSuccess, data);
          if(result.status === 200){

            handleSuccessfulPayment(result);
            console.log(result)
            console.log("awooga")
            setOrderSuccessful(true)
            setTimeout(() => {
              setOrderSuccessful(false);
            }, 3000);
            // setOrder([...cart,{orderId:result.data.orderId,paymentId: result.data.paymentId}])
            let neworder = ([cart,{orderId:result.data.orderId,paymentId: result.data.paymentId}])
            setOrder(neworder)
            let tempsuperobj  = {
              item:{
                'basic base': '0',
                'chicken masala base': '0',
                'thin crust base': '0',
                'veg kekab base': '0',
                'cheese crust base': '0'
              },
              sauce:{
                'pesto sauce': '0',
                'salsa sauce': '0',
                'bbq sauce': '0',
                'mayonnaise sauce':'0',
                'alfredo sauce': '0'
              },
              cheese: {
                'mozzarella cheese': '0',
                'cheddar cheese': '0',
                'parkmesan cheese': '0',
                'ricotta cheese': '0',
                'goat cheese': '0'
              },
              topping: {
                'pepperoni': '0',
                'mushroom': '0',
                'extra cheese': '0',
                'black olives': '0',
                'tomato': '0'
              }              
            }
            for (const key in Cart) {
              if (Object.hasOwnProperty.call(Cart, key)) {
                const element = Cart[key];
                if('key' === 'Capsicum Pizza'){
                  if('key' in tempsuperobj){
                    // tempsuperobj[key] =  tempsuperobj[key]
                  }
                  tempsuperobj = {...tempsuperobj, }
                }
              }
            }
            // let updateinv = await axios.post(navigationStrings.urlUpdateInv, {updatetype: 'incdec',newdata: cart})
            let updateinv = await axios.post(navigationStrings.urlUpdateInv, {updatetype: 'autoincdecs'})
            setCart({})
          }
          // alert(result.data.msg);
      },
      prefill: {
          name: "Ujjwal Devre",
          email: "devreujjval@gmail.com",
          contact: "8789842950",
      },
      notes: {
          address: "SSGMCE Coll, Shegaon",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

  const getPizzaPrice = (name,numberof) => {
    let eleee;
    pizzanames.forEach((element,index) => {
      if(element === name){ 
        eleee = pizzaPrice[index]*numberof
        // return pizzaPrice[index]*numberof
       
      }
     
    });
    return eleee;
    
  }
  
    // console.log(cart.  +"  cart")
    let str = JSON.stringify(cart);
    console.log(str);
    
    let cartarr = [];
    let customcartarr = [];
    for (const key in cart) {
      if (Object.hasOwnProperty.call(cart, key)) {
        if(key !== 'custom'){
          getPizzaPrice(key)
          const element = cart[key];
          console.log(`${key}: ${element}`);
          totalCartPrice+=getPizzaPrice(key,element)
          cartarr.push(<h3 className='pizzaincart'>{key} x  {element} <text className='cartpriceText'> ₹{getPizzaPrice(key,element)}  </text> </h3>)
        }
        else{
          
          // cart['custom'].forEach((ele)=> ele)
          for (const key2 in cart['custom']) {
            if (Object.hasOwnProperty.call(cart['custom'], key2)) {
              const element = cart['custom'][key2];
              customcartarr.push(<h3 className='pizzaincart'>{key2}:   {element}</h3>)
            }
          }
          totalCartPrice+=999
          // customcartarr.push(<h3 className='pizzaincart'><text className='cartpriceText'>   </text> </h3>)
        }
      }
    }
    // for (const key in cart.custom) {
    //   if (cart.custom.hasOwnProperty.call(cart.custom, key)) {
    //     const element = cart.custom[key];
        
    //   }
    // }
    // console.log(cart);

    const EmptyCart = () => {
      return(
      <div>
      <h1 style={{textAlign:'center'}}>Empty Cart</h1>
      </div>)
    }
    const CartMain = () => {
      return(
        <div className='cartDivMain'>
        { orderSuccessful  && <Toast val={'Order Placed!'} hidden={false} />}
                <div className='cartMainDiv' > 
                {/* <h2>Cart</h2> */}
                  <div className='cartInnerMain'>
                    <text className='pizzatypeText'>Pizza's</text>
                      {cartarr}
                    <text className='pizzatypeText'>Custom Pizza <text style={{backgroundColor:'black',color:'white',fontSize: 22,padding:5}}>₹999</text> </text>
                      {customcartarr}
                      <h2 style={{marginTop: 20,position:'absolute'}} >Total: {totalCartPrice}</h2>
                  {/* <div className='cartBuyButton' onClick={displayRazorpay} >Buy</div> */}
                  <div className='cartBuyButton' onClick={displayRazorpay} >Buy</div>
                  </div>
                </div>
                {/* problem here */}
            </div>
      )
    }
    return (
      (Object.entries(cart).length !== 0 ? <CartMain/>:<EmptyCart/>)
      
  )
}

export default Cart
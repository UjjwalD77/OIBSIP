import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Toast from './components/toast'
import { authContext } from './context';
const pizzaImg = require('./images/Pizza.jpg');

const Home = () => {
  const [pizzaCounter, setPizzaCounter] = useState([0,0,0,0,0,0]);
  
  const [addedToCart, setAddedToCart] = useState(false);
  const {cart,setCart,pizzaPrice,pizzanames,setOrder} = useContext(authContext);

  // const [pizzaCounter0, setPizzaCounter0] = useState(0);
  // const [pizzaCounter1, setPizzaCounter1] = useState(0);
  // const [pizzaCounter2, setPizzaCounter2] = useState(0);
  // const [pizzaCounter3, setPizzaCounter3] = useState(0);
  // const [pizzaCounter4, setPizzaCounter4] = useState(0);
  // const [pizzaCounter5, setPizzaCounter5] = useState(0);
  
  const handleOnCLickTEmp = () =>{
    let temporder = [{'Tomato Pizza': 1, 'Capsicum Pizza': 3, 'custom':{'base':'normal','sauce':'hot sauce','cheese':'goat cheese'}},{'orderId': 'djfoijfij','paymentId': 'sisjfoiej'}];
    setOrder(temporder)
  }
  const incrementPizzaCount = (index) => {
    console.log(index)
    const localcounter  = pizzaCounter;
    localcounter[index] += 1;
    setPizzaCounter([...localcounter]);
    // setPizzaCounter(pizzaCounter+1)
    console.log(pizzaCounter);
  }
  const decrementPizzaCount = (index) => {
    if(pizzaCounter[index] <= 0){
      return;
    }
    console.log(index)
    const localcounter  = pizzaCounter;
    localcounter[index] -= 1;
    setPizzaCounter([...localcounter]);
    // setPizzaCounter(pizzaCounter+1)
    console.log(pizzaCounter);
  }
  const addToCart = () => {
    
    let tempcart = cart;
    for(let i = 0; i< pizzaCounter.length ; i++){
      if(pizzaCounter[i]>0){
        
        if(pizzanames[i] in cart){
          // console.log(tempcart);
          // console.log(tempcart[pizzanames[i]]+pizzaCounter[i] );
          tempcart = {...tempcart, [pizzanames[i]]: tempcart[pizzanames[i]]+pizzaCounter[i]}
          // tempcart = {...tempcart, [pizzanames[i]]: tempcart.pizzanames[i]+=pizzaCounter[i] }
          // cart.pizzanames[i]  += pizzaCounter[i];
        }
        else{
          tempcart = {...tempcart, [pizzanames[i]]: pizzaCounter[i]};
        }
      }
      setCart(tempcart);
    }
    console.log(tempcart);
    setPizzaCounter([0,0,0,0,0,0])

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  }
  
  return (
    <>
      {addedToCart && <Toast val={'Added to Cart'} hidden={false} />}
      <div className="mainTopDiv">
        <h1> Welcome to Pizza Delivery System</h1>
      </div>
      <div className="secondDiv">
        <h3 style={{ marginLeft: 20 }}>Choose from a variety:  </h3>
        <h3 className='addToCart'  onClick={addToCart} >Add to Cart </h3>
        {/* <h3 className='addToCart'  onClick={handleOnCLickTEmp} >Add to Cart </h3> */}
        <br />
      </div>
      <div className="mainMiniBlocks">
        <div className="blocksColumn">
          <div className="block">
            <h3 className="pizzaTitle">Capsicum Pizza</h3>
            <img className="pizzapicImg" src={pizzaImg} alt='OOPs'height={200} />
            <div className='blockBottom'>
              <div className='inputGroup' >
                <div className='inputDecrement'  onClick={()=>decrementPizzaCount(0)}>-</div>
                <div className='inputCounter' value={pizzaCounter} >{pizzaCounter[0]}</div>
                <div className='inputIncrement' onClick={()=>incrementPizzaCount(0)}>+</div>
                <div className='priceDiv'> Rs {pizzaPrice[0]} </div>
              </div>
            </div>
          </div>
          <div className="block">
          <h3 className="pizzaTitle">Tomato Pizza</h3>
          <img className="pizzapicImg" src={pizzaImg} alt='OOPs'height={200} />
          <div className='blockBottom'>
            <div className='inputGroup' >
              <div className='inputDecrement'  onClick={()=>decrementPizzaCount(1)}>-</div>
              <div className='inputCounter'>{pizzaCounter[1]}</div>
              <div className='inputIncrement' onClick={()=>incrementPizzaCount(1)} >+</div>
              <div className='priceDiv'> Rs {pizzaPrice[1]} </div>
            </div>
          </div>
          </div>
          <div className="block">
          <h3 className="pizzaTitle">Cheese Burst Pizza</h3>
          <img className="pizzapicImg" src={pizzaImg} alt='OOPs'height={200} />
          <div className='blockBottom'>
            <div className='inputGroup' >
              <div className='inputDecrement'  onClick={()=>decrementPizzaCount(2)}>-</div>
              <div className='inputCounter'>{pizzaCounter[2]}</div>
              <div className='inputIncrement' onClick={()=>incrementPizzaCount(2)} >+</div>
              <div className='priceDiv'> Rs {pizzaPrice[2]} </div>
            </div>
          </div>
          </div>
        </div>
        <div className="blocksColumn">
          <div className="block">
          <h3 className="pizzaTitle">Chicken Tikka Pizza</h3>
          <img className="pizzapicImg" src={pizzaImg} alt='OOPs'height={200} />
          <div className='blockBottom'>
            <div className='inputGroup' >
              <div className='inputDecrement'  onClick={()=>decrementPizzaCount(3)}>-</div>
              <div className='inputCounter'>{pizzaCounter[3]}</div>
              <div className='inputIncrement' onClick={()=>incrementPizzaCount(3)}>+</div>
              <div className='priceDiv'> Rs {pizzaPrice[3]} </div>
            </div>
          </div>
          </div>
          <div className="block">
          <h3 className="pizzaTitle">Chicken Pepperoni Pizza</h3>
          <img className="pizzapicImg" src={pizzaImg} alt='OOPs'height={200} />
          <div className='blockBottom'>
            <div className='inputGroup' >
              <div className='inputDecrement'  onClick={()=>decrementPizzaCount(4)}>-</div>
              <div className='inputCounter'>{pizzaCounter[4]}</div>
              <div className='inputIncrement' onClick={()=>incrementPizzaCount(4)}>+</div>
              <div className='priceDiv'> Rs {pizzaPrice[4]} </div>
            </div>
            </div>
          </div>
          <div className="block">
          <h3 className="pizzaTitle">Chicken Supreme Pizza</h3>
          <img className="pizzapicImg" src={pizzaImg} alt='OOPs'height={200} />
          <div className='blockBottom'>
            <div className='inputGroup' >
              <div className='inputDecrement'  onClick={()=>decrementPizzaCount(5)}>-</div>
              <div className='inputCounter'>{pizzaCounter[5]}</div>
              <div className='inputIncrement' onClick={()=>incrementPizzaCount(5)}>+</div>
              <div className='priceDiv'> Rs {pizzaPrice[5]} </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </>



      )
}

      export default Home;
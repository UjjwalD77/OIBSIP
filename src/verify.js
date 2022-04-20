import React, { useState,useEffect } from 'react'
import './verify.css';
import Header from './header';
import { useSearchParams,Link,Navigate } from 'react-router-dom';
import axios from 'axios';
import navigationStrings from './constants/navigationStrings';

const Verify = () => {
    const [currentparams,setcur] = useSearchParams();
    const key = currentparams.get('key');
    const [isVerified,setIsVerified] = useState(false);

    const WaitFor = () => {
        return(
            <>
            <h1>Please wait... Verification in progress!</h1>
            </>
        )
    }
    const Done = () => {
        return(
            <div className='divVerifyMain' >
            <h1>Successfully Verified... You can proceed to login now.</h1>
            <Link className='gotoLoginButton' to="/" ><div className='verifyLINKLINK' onClick={()=>{return <Navigate to="/" />;}} >Login</div> </Link>
            </div>
            // <Link to="/insert/your/path/here" className="btn btn-primary">hello</Link>
        )
    }
    const verify = async() =>{

        try{
            
            let res = await axios.post(navigationStrings.urlVerifyUser,{'tempuserkey': key}) //!!!!!!!!!!!
            await console.log(res);
            if(res.status == 200){
                    setIsVerified(true);
                }                
            }
            catch(e){
                console.log(e);
            }
        }
    useEffect(()=>{
        verify()
    },[]);
    
    return(
        <>
            {isVerified?<Done/>:<WaitFor/>}
        </>
        )
}

export default Verify
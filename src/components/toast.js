import React from 'react'
import './toast.css'

const Toast = (props) => {
  if(props.hidden == false){
      return (
        <div className='toastabove' >
          <div className='mainToastDiv' >
            <text >{props.val}</text>
          </div>
        </div>
      )
  }
}

export default Toast;
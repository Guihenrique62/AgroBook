import React from 'react'
import { Link } from 'react-router-dom'
import './errorModal.css'

export default function ErrorModal({isOpen, message,page}) {


    if(isOpen){
        return (
            <div className='backgroundModalError'>
                <div className="errorModal">
                    <img src="/error-image.png" alt="errorImage" />
                    <p>{message}</p>
                    <Link to={page} className='LinktoPageModal'>OK</Link>
                </div>
            </div>
        )
    }
}

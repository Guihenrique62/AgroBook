/*
  CRIADO POR: GUILHERME HENRIQUE PORTO DOS SANTOS
  EMAIL: guilhermeportosantos1@gmail.com
*/

import React from 'react'
import { Link } from 'react-router-dom'
import './alertModal.css'

export default function AlertModal({isOpen,setIsOpen, LinkToSucess, message, buttonMessageSucess}) {
    if(isOpen){

        //VALIDA SE OS PARAMETROS FORAM PASSADOS
        if (!setIsOpen || !LinkToSucess || !message || !buttonMessageSucess) {
            console.error('um ou mais parametros não atribuidos Menu Lateral')
            return
        }

        return (
            <div className='backgroundModalAlert'>
                <div className="alertModal">
                    <img src="/alert-modal-icon.png" alt="errorImage" />
                    <p>{message}</p>
                    
                    <div className='conteinerBtnModalAlert'>
                        <Link to={LinkToSucess} className='continuosModalAlertButton' >{buttonMessageSucess}</Link>
                        <button className='cancelModalAlertButton' onClick={()=> setIsOpen(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }
}

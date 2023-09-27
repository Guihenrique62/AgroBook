import { useState } from 'react'

export  default function addandRemove(){
    const [ book, setBook]= useState(()=> {
        const storageBook = localStorage.getItem("biblioteca")
        if(!storageBook)  return []
         return  JSON.parse(storageBook) 
     }
     )
   
   const addBook =({titulo , conver,sinopse}) =>{
   const id = Math.floor(Math.random()* 100000000 )
   const book ={ id,titulo, conver, sinopse}
   setBook( state => {
     const newstate = [...state, book]
   localStorage.setItem("biblioteca", JSON.stringify(newstate))
   return newstate
   }
   )}
   const removeBook=(id)=>{
     setBook(state => {const newremove = state.filter(books => books.id !==id )
     localStorage.setItem("biblioteca", JSON.stringify(newremove))
     return newremove
     
     } )
   }
   return{addBook,removeBook,book}
}
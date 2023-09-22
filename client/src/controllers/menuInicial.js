import axios from "axios"
import { useEffect, useState } from "react"

  export default function menuInicial(){
    const[addTitulo, setaaddTitulo]=useState([])

    const getpost= async()=>{

            let data={
                filter:{
                     categoria:["romance"],
                     titulo:{"$regex": "O senhor dos anei", "$options": "i"}

                },
                    sort:{
                        _id:-1
                    },
                    limit:6,
                    
                
               
            } 


        try {
            let response= axios.get("http://20.226.73.46:57601/api/book/list_book",data,{
                withCredentials: true,
            })
             const res= response.data.filter.categoria
        
             
             
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

        let pesquisar= async(pesquisando)=>{
              
        }


    useEffect(()=>{
    getpost()
    },[])



}
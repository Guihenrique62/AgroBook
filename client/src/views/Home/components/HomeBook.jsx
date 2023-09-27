import React from "react";
import { useParams } from "react-router-dom";

export default function HomeBook(){

    const { bookID } = useParams() //Pega o ID passado na URL


    return(
        <h2>ok</h2>
    )
}
import React from "react";
import HOC from "../layout/HOC";
import {useParams} from "react-router-dom";

const ProductPage = ()=>{
    const {id} = useParams();
    return (
        <>
            Product Page
            id:- {id}
        </>
    )
}

export default HOC(ProductPage)
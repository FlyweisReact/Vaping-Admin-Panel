/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleOrder = () => {

    const { id } = useParams()

    
  const BaseUrl = "https://krish-vapes-backend.vercel.app/";
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

    const getOrder = async () => {
            try{

            }catch(e) {
                
            }
    }

  return (
    <section>
    <p className="headP">Dashboard / Order</p>
    <section className="sectionCont">
    
    </section>
  </section>
  );
};

export default HOC(SingleOrder);

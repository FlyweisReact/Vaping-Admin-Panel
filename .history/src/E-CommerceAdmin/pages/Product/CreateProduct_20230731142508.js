/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const CreateProduct = () => {

    const [categoryId , setCategoryId ] = useState(null)
    const [subcategoryId , setSubCategoryId ] = useState(null)
    const [name , setName ] = useState(null)
    const [description  , setDescription ] = useState(null)
    const [price , setPrice ] = useState(null)
    const [taxInclude , setTaxInclude ] = useState(false)
    const [ ] = useState(null)
    const [ ] = useState(null)

  return (
    <section>
      <p className="headP">Dashboard / Create New Product</p>
      <section className="sectionCont">
        <Form>
          <Link to="/Orders">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);

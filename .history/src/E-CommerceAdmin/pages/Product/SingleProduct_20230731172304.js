/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";

  const getOrder = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/v1/Product/${id}`);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getImageLink = (item) => {
    if (item?.productId?.colorActive === true) {
      return item?.productColorId?.img;
    } else {
      return item?.productId?.img;
    }
  };
  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <section>
      <p className="headP">Dashboard / Order</p>
      <section className="sectionCont">
        <Form>
          <img src={getImageLink(data)} alt="" className="centerImage" />
          {ValueChecker(data?.name, "Product Name")}
          {ValueChecker(data?.description, "Description")}
          {ValueChecker(data?.price, "Price")}
          {ValueChecker(data?.quantity, "Quantity")}
          {ValueChecker(data?.discountPrice, "Discount Price")}
          {ValueChecker(data?.tax, "Tax")}
          {ValueChecker(data?.ratings, "Ratings")}

          {data?.colors ? (
            <Form.Group className="mb-3">
              <Form.Label>Colors </Form.Label>
              <Form.Control placeholder={<ul>
                
              </ul>} disabled />
            </Form.Group>
          ) : (
            ""
          )}

          <Link to="/Product">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(SingleProduct);

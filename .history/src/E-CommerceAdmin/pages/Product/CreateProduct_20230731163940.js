/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubCategoryId] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [taxInclude, setTaxInclude] = useState(false);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [colorActive, setColorActive] = useState(false);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState([]);
  const [colorName, setColorName] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [arrayQuantity, setArrayQuantity] = useState([]);
  const [ quantityDigit , setQuantityDigit ] = useState('')

  const ColorSelector = (colors) => {
    setColor((prev) => [...prev, colors]);
    setColorName("");
  };

  const RemoveColor = (index) => {
    setColor((prev) => prev.filter((_, i) => i !== index));
  };


  const QuantitySelector = (quantity) => {
    setArrayQuantity((prev) => [...prev, quantity]);
    setQuantityDigit("");
  };

  const RemoveQuantity = (index) => {
    setArrayQuantity((prev) => prev.filter((_, i) => i !== index));
  };


  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  fd.append("categoryId", categoryId);
  fd.append("subcategoryId", subcategoryId);
  fd.append("name", name);
  fd.append("description", description);
  fd.append("price", price);
  fd.append("taxInclude", taxInclude);
  fd.append("tax", tax);
  fd.append("discount", discount);
  fd.append("discountPrice", discountPrice);
  fd.append("colorActive", colorActive);

  if (colorActive === "true") {
    if (size === "false") {
      Array.from(color).forEach((item) => {
        fd.append("color", item);
      });
      Array.from(images).forEach((img) => {
        fd.append("images", img);
      });
      fd.append("arrayQuantity", arrayQuantity);
    } else {
      fd.append("size", size);
      Array.from(color).forEach((item) => {
        fd.append("color", item);
      });
      Array.from(images).forEach((img) => {
        fd.append("images", img);
      });
    }
  } else {
    fd.append("image", image);
    fd.append("quantity", quantity);
  }

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://krish-vapes-backend.vercel.app/api/v1/Product/addProduct`,
        fd,
        Auth
      );
      toast.success(res.data.message);
    } catch (e) {
      console.log(e);
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <section>
      <p className="headP">Dashboard / Create New Product</p>
      <section className="sectionCont">
        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
              <option>-- Select Category --</option>
              <option value="64be3ea62591b241463b2528">
                64be3ea62591b241463b2528
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Select onChange={(e) => setSubCategoryId(e.target.value)}>
              <option>-- Select Sub-Category --</option>
              <option value="64be45844bbd0ae3dcbe3e18">
                64be45844bbd0ae3dcbe3e18
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Include Tax</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setTaxInclude(e.target.value)}
            >
              <option>-- Select Prefrence --</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Form.Select>
          </Form.Group>

          {taxInclude === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Tax</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setTax(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3">
            <Form.Label>Include Discount</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option>-- Select Prefrence --</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Form.Select>
          </Form.Group>

          {discount === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3">
            <Form.Label>Is Color Active</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setColorActive(e.target.value)}
            >
              <option>-- Select Prefrence --</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Form.Select>
          </Form.Group>

          {colorActive === "true" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Select onChange={(e) => setSize(e.target.value)}>
                  <option>-- Select Prefrence --</option>
                  <option value={"true"}>True</option>
                  <option value={"false"}>False</option>
                </Form.Select>
              </Form.Group>

              {size === "true" ? (
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Color</Form.Label>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "90%", margin: "0" }}>
                        <Form.Control
                          type="text"
                          onChange={(e) => setColorName(e.target.value)}
                          value={colorName}
                        />
                      </div>
                      <i
                        className="fa-solid fa-plus"
                        onClick={() => ColorSelector(colorName)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                    <ul className="mt-2">
                      {color?.map((i, index) => (
                        <li
                          key={index}
                          onClick={() => RemoveColor(index)}
                          style={{ listStyle: "disc" }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            {i}{" "}
                            <i
                              className="fa-solid fa-minus ml-2 "
                              style={{ cursor: "pointer" }}
                            ></i>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImages(e.target.files)}
                      multiple
                    />
                  </Form.Group>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {size === "false" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setColor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImages(e.target.files[0])}
                  multiple
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setArrayQuantity(e.target.value)}
                />
              </Form.Group>
            </div>
          ) : (
            ""
          )}

          {colorActive === "false" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </div>
          ) : (
            " "
          )}

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              Submit
            </Button>

            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);

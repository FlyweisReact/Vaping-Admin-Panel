/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Badge,
  FloatingLabel,
  Spinner,
  Alert,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";

const Product = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://krish-vapes-backend.vercel.app/api/v1/Product/all/paginateProductSearch?page=${page}&limit=10&search=${query}`
      );
      setData(data.data);
      setTotal(data.data.total);
    } catch (e) {
      console.log(e);
    }
  };

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    setPage(page + 1);
  }

  const getImageLink = (item) => {
    if (item?.colorActive === true) {
      return item?.colors?.[0]?.img;
    } else {
      return item?.img;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, query]);

  function MyVerticallyCenteredModal(props) {

 

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? "Edit Product" : " Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        </Modal.Body>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
    const [singleProduct, setSingleProduct] = useState([]);

    const fetchProductById = async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/${id}`
        );
        setSingleProduct(data.product);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      if (props.show) {
        fetchProductById();
      }
    }, [props]);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Product{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {singleProduct?.product_name ? (
            <p className="View">
              {" "}
              <strong> Product Name : </strong> {singleProduct?.product_name}{" "}
            </p>
          ) : (
            ""
          )}
          {singleProduct?.asin ? (
            <p className="View">
              {" "}
              <strong>Asin : </strong> {singleProduct?.asin}
            </p>
          ) : (
            ""
          )}
          {singleProduct?.id ? (
            <p className="View">
              {" "}
              <strong>Id : </strong> {singleProduct?.id}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.description ? (
            <p className="View">
              {" "}
              <strong>Description : </strong> {singleProduct?.description}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.brand ? (
            <p className="View">
              {" "}
              <strong>Brand : </strong> {singleProduct?.brand}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.color ? (
            <p className="View">
              {" "}
              <strong>Color : </strong> {singleProduct?.color}{" "}
            </p>
          ) : (
            ""
          )}

          {singleProduct?.bullet_text?.[0] ? (
            <p className="View">
              {" "}
              <strong>Bullet Text : </strong>{" "}
              {singleProduct?.bullet_text?.map((i, index) => (
                <ul key={index} style={{ listStyle: "disc" }}>
                  <li> {i} </li>
                </ul>
              ))}{" "}
            </p>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:8886/api/product/${id}`
      );
      console.log(data);
      fetchData();
      toast.success("Product Deleted SuccessFully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MyVerticallyCenteredModal2
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      <p className="headP">Dashboard / Products</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Product's ( Total : {total} )
        </span>
        <div className="d-flex gap-1">
          {/* <button
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
            >
              Add Product
            </button> */}
        </div>
      </div>

      <section className="sectionCont">
        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="filterBox">
              <img
                src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
                alt=""
              />
              <input
                type="search"
                placeholder="Start typing to search for products"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="overFlowCont">
              {data?.docs?.length === 0 || !data ? (
                <Alert>No Product Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Total Stock</th>
                      <th>Category</th>
                      <th> Options </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.docs?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td style={{ cursor: "pointer" }}>
                          <div className="CarouselImages">
                            <img src={getImageLink(i)} alt="" />
                          </div>
                        </td>

                        <td> {i.name} </td>
                        <td> £{i.price} </td>
                        <td>£{i.discountPrice}</td>
                        <td>
                          {i.quantity >= 10 ? (
                            <Badge bg="success">{i.quantity} In Stock</Badge>
                          ) : (
                            <Badge bg="danger">{i.quantity} In Stock</Badge>
                          )}
                        </td>
                        <td>{i.categoryId?.name}</td>

                        <td>
                          {/* <span className="flexCont">
                              <i
                                className="fa-solid fa-pen-to-square"
                                onClick={() => {
                                  setBigId(i._id);
                                  setEdit(true);
                                  setModalShow(true);
                                }}
                              ></i>
                              <i
                                className="fa-solid fa-eye"
                                onClick={() => {
                                  setId(i._id);
                                  setModalShow2(true);
                                }}
                              ></i>
                              <i
                                className="fa-sharp fa-solid fa-trash"
                                onClick={() => deleteHandler(i._id)}
                              ></i>
                            </span> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <div className="pagination">
                <button onClick={() => Prev()} className="prevBtn">
                  <i className="fa-solid fa-backward"></i>
                </button>

                <button onClick={() => Next()} className="nextBtn">
                  {" "}
                  <i className="fa-sharp fa-solid fa-forward"></i>
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(Product);

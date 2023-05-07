import React, { useState } from 'react'
import { Layout } from '../components/Layout';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../actions/productAction';
import "./Products.css"
import { generatePublicUrl } from '../urlConfig';


export const Products = () => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [pictures, setPictures] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [productDetailsModal, setProductDetailsModal] = useState(false)
  const [productDetails, setProductDetails] = useState(null)
  const category = useSelector(state => state.category)
  const product = useSelector(state => state.product)
  const dispatch = useDispatch();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name)
    form.append("quantity", quantity)
    form.append("price", price)
    form.append("description", description)
    form.append("category", categoryId)
    for (let pic of pictures) {
      form.append("pictures", pic)
    }
    dispatch(addProduct(form))
    setShow(false)
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const handleProductImage = (e) => {
    setPictures([...pictures, e.target.files[0]]);
  }

  const renderProducts = () => {
    return (
      <Table style={{ marginTop: "50px" }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ? product.products.map(product =>
              <tr onClick={() => { showProductDetailsModal(product) }} key={product._id}>
                <td>1</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
              </tr>
            ) : null
          }

        </tbody>
      </Table>
    )
  }

  const renderAddProductModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className='form-control' type="text" value={name} placeholder={"Product Name"} onChange={(e) => { setName(e.target.value) }} />
          <input className='form-control' type="text" value={price} placeholder={"Product Price"} onChange={(e) => { setPrice(e.target.value) }} />
          <input className='form-control' type="number" value={quantity} placeholder={"Product Quantity"} onChange={(e) => { setQuantity(e.target.value) }} />
          <input className='form-control' type="text" value={description} placeholder={"Product Description"} onChange={(e) => { setDescription(e.target.value) }} />
          <select className='form-control' value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option>Select Categoryy</option>
            {
              createCategoryList(category.categories).map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </select>
          <input type="file" name="pictures" id="" className='form-control' onChange={handleProductImage} />
          {
            pictures.length > 0 ? pictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false);
  }

  const showProductDetailsModal = (product) => {
    setProductDetailsModal(true);
    setProductDetails(product)
  }

  const renderProductDetailsModal = () => {

    if (!productDetails) {
      return null
    }

    return (
      <Modal size='lg' show={productDetailsModal} onHide={handleCloseProductDetailsModal}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="6">
              <label className='key'>Name </label>
              <p className="value">{productDetails.name}</p>
            </Col>
            <Col md="6">
              <label className='key'>Price </label>
              <p className="value">{productDetails.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label className='key'>Stock </label>
              <p className="value">{productDetails.quantity}</p>
            </Col>
            <Col md="6">
              <label className='key'>Category </label>
              <p className="value">{productDetails.category.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label className='key'>Description </label>
              <p className="value">{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12" >
              <label className='key'>Product Pictures </label>
              <div style={{ display: "flex" }}>{productDetails.pictures.map((picture) => { return (<div className="productImgContainer" ><img src={generatePublicUrl(picture.img)} alt="img" /></div>) })}</div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5%" }}>
                <h1>Products</h1> <br></br>
                {/* <button onClick={handleShow}>Add Product</button> */}
                <button className='btn btn-outline-dark btn1' onClick={handleShow}> Add Product</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {renderProducts()}
            </Col>
          </Row>
        </Container>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </Layout>
    </>
  )
}

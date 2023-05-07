import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory, updateCategories, deleteCategoriesAction } from '../actions/categoryAction';
import { Layout } from '../components/Layout';
import CheckboxTree from 'react-checkbox-tree';
import { IoArrowDownCircle, IoArrowForwardCircleSharp, IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import "./Category.css";

export const Category = (props) => {

  const category = useSelector(state => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const dispatch = useDispatch();

  const handleShow = () => setShow(true);

  const handleClose = () => {
    const form = new FormData();
    if (categoryName === "") {
      alert("Category Name is required !")
      return;
    }
    form.append("name", categoryName)
    form.append("parentId", parentId)
    form.append("categoryImage", categoryImage)
    dispatch(addCategory(form));
    setCategoryName("");
    setParentId("");
    setCategoryImage("");
    setShow(false);
  }

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      )
    }
    return myCategories;
  }

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      })
      if (category.children.length > 0) {
        createCategoryList(category.children, options)
      }
    }
    return options;
  }

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  }

  const renderAddCategoryModal = () => {
    return (
      <>
        {/* Add a catgeory  */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <input className='form-control' type="text" value={categoryName} placeholder={"Category Name"} onChange={(e) => { setCategoryName(e.target.value) }} />
              </Col>
              <Col>
                <select className='form-control' value={parentId} onChange={(e) => setParentId(e.target.value)}>
                  <option>Select Categoryy</option>
                  {
                    createCategoryList(category.categories).map(option =>
                      <option key={option.value} value={option.value}> {option.name}</option>)
                  }
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                <input type="file" name="categoryImage" id="" className='form-control' onChange={handleCategoryImage} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button> */}
            <Button className='add-cat-btn-save' variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId === category.value)
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId === category.value)
      category && expandedArray.push(category);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  }

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item)
      setCheckedArray(updatedCheckedArray);
    }
    else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item)
      setExpandedArray(updatedExpandedArray);
    }
  }

  const updateCategoriesForm = async () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    })
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    })
    dispatch(updateCategories(form))
      .then(() => dispatch(getAllCategory()))
    setUpdateCategoryModal(false);
  }

  const renderupdateCatgeoriesModal = () => {
    return (
      <>
        {/* Edit a Category  */}
        <Modal show={updateCategoryModal} size="lg " onHide={() => { setUpdateCategoryModal(false) }}>
          <Modal.Header closeButton>
            <Modal.Title> <strong>UPDATE CATEGORIES</strong> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h6> <strong>Expanded Categories</strong></h6>
              </Col>
            </Row>
            {
              expandedArray.length > 0 && expandedArray.map((item, index) =>
                <Row key={index}>
                  <Col>
                    <input className='form-control' type="text" value={item.name} placeholder={"Category Name"}
                      onChange={(e) => handleCategoryInput("name", e.target.value, index, "expanded")} />
                  </Col>
                  <Col>
                    <select className='form-control' value={item.parentId}
                      onChange={(e) => handleCategoryInput("parentId", e.target.value, index, "expanded")}>
                      <option>Select Categoryy</option>
                      {
                        createCategoryList(category.categories).map(option =>
                          <option key={option.value} value={option.value}> {option.name}</option>)
                      }
                    </select>
                  </Col>
                  <Col>
                    <select className='form-control' value={item.type} onChange={(e) => handleCategoryInput("type", e.target.value, index, "expanded")}>
                      <option value="">Select Type</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </Col>
                </Row>
              )
            }
            <br />
            <Row>
              <Col>
                <h6> <strong>Checked Categories</strong></h6>
              </Col>
            </Row>
            {
              checkedArray.length > 0 && checkedArray.map((item, index) =>
                <Row key={index}>
                  <Col>
                    <input className='form-control' type="text" value={item.name} placeholder={"Category Name"}
                      onChange={(e) => handleCategoryInput("name", e.target.value, index, "checked")} />
                  </Col>
                  <Col>
                    <select className='form-control' value={item.parentId}
                      onChange={(e) => handleCategoryInput("parentId", e.target.value, index, "checked")}>
                      <option>Select Categoryy</option>
                      {
                        createCategoryList(category.categories).map(option =>
                          <option key={option.value} value={option.value}> {option.name}</option>)
                      }
                    </select>
                  </Col>
                  <Col>
                  <select className='form-control' value={item.type} onChange={(e) => handleCategoryInput("type", e.target.value, index, "checked")}>
                      <option value="">Select Type</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </Col>
                </Row>
              )
            }
            {/* <input type="file" name="categoryImage" id="" className='form-control' onChange={handleCategoryImage} /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setUpdateCategoryModal(false) }}>
              Close
            </Button>
            <Button variant="primary" onClick={updateCategoriesForm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </>
    )
  }

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true)
  }

  const deleteCategoriesFunction = () => {
    // eslint-disable-next-line
    const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
    const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
    // const IdsArray=expandedIdsArray.concat(checkedIdsArray);
    if (checkedArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray))
        .then(() => dispatch(getAllCategory()));

      setDeleteCategoryModal(false);
    }

  }

  const renderDeleteCategoryModal = () => {
    return (
      <Modal show={deleteCategoryModal} onHide={() => setDeleteCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> <strong>Are you sure?</strong> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <strong>Are you sure?</strong> */}
          {/* <h5> <strong>Expanded Deleted Items-</strong> </h5>
          {
            expandedArray.map((item, index) => <span key={index}>{item.name}, </span>)
          } */}
          <h5> <strong>Checked Deleted Items-</strong> </h5>
          {
            checkedArray.map((item, index) => <span key={index}>{item.name}, </span>)
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setDeleteCategoryModal(false) }}>
            No
          </Button>
          <Button variant="danger" onClick={deleteCategoriesFunction}>
            Yes
          </Button>
        </Modal.Footer>

      </Modal>
    )
  }

  return (
    <>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Category</h1>
                <div className="category-btns-container">
                  <button className='btn btn-outline-dark btn1' onClick={handleShow}> Add Category</button> <br />
                  <button className='btn btn-outline-dark btn3' onClick={updateCategory}>Edit Categories</button> <br />
                  <button className='btn btn-outline-dark btn2' onClick={deleteCategory}>Delete Categories</button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                  check: <IoCheckmarkCircleSharp />,
                  uncheck: <IoCheckmarkCircleOutline />,
                  halfCheck: <IoCheckmarkCircleOutline />,
                  expandClose: <IoArrowForwardCircleSharp />,
                  expandOpen: <IoArrowDownCircle />,
                }}
              />
            </Col>
          </Row>
        </Container>
        {renderAddCategoryModal()}
        {renderupdateCatgeoriesModal()}
        {renderDeleteCategoryModal()}
      </Layout>
    </>
  )
}

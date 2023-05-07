import React, { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { Row, Col } from 'react-bootstrap';
import LinearCatgeories from '../helpers/LinearCategories';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { createPage } from '../actions/pageAction';

export const Page = () => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("")
    const [banners, setBanners] = useState("");
    const [products, setProducts] = useState("");
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState();
    const [catId,setCatId]=useState('');
    const category = useSelector(state => state.category) //getting the categoryReducer
    const dispatch = useDispatch();
    const page=useSelector(state=>state.page) //getting the pageReducer

    useEffect(() => {
        setCategories(LinearCatgeories(category.categories))
    }, [category]) //[category] defines that whenever category changes it will call this again automatically

    useEffect(()=>{
        console.log(page);
        // if(page.laoding){
        //     setCreateModal(false)
        // }
    },[page]) //[page] defines that whenever page changes it will call this again automatically

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.name === e.target.value)
        setCategoryId(e.target.value);
        setCatId(category.value);
        setType(category.type);
    }

    const handleBannerImages = (e) => {
        console.log(e);
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]]);
    }

    const submitPageForm = (e) => {
        if (title === "") {
            alert("Title is required");
            setCreateModal(false);
            return;
        }
        if (description === "") {
            alert("Description is required");
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append("title", title);
        form.append("description", description);
        form.append("category", catId);
        form.append("type", type);
        if(banners){
            banners.forEach((banner, index) => {
                form.append("banners", banner)
            })
        }
        if(products){
            products.forEach((product, index) => {
                form.append("products", product)
            })
        }
        dispatch(createPage(form));
        setCreateModal(false)
    }

    const renderCreatePageModal = () => {
        return (
            <Modal show={createModal} onHide={() => setCreateModal(false)}>
                {/* // <Modal show={createModal} onHide={submitPageForm}>  */}
                <Modal.Header closeButton>
                    <Modal.Title> <strong>Create New Page</strong> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <select className='form-control' value={categoryId} onChange={onCategoryChange}>
                                    <option value="">Select Category</option>
                                    {
                                        categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)
                                    }
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className='form-control' value={title}
                                    onChange={(e) => setTitle(e.target.value)} placeholder="Page Title" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input className='form-control' value={description}
                                    onChange={(e) => setDescription(e.target.value)} placeholder="Page Description" />
                            </Col>
                        </Row>
                        <Row>
                            {
                                banners.length > 0 ?
                                    banners.map((banner, index) =>
                                        <Row key={index}>
                                            <Col>{banner.name}</Col>
                                        </Row>
                                    ) : null
                            }
                            <Col>
                                <input type="file" name='banners' className='form-control'
                                    onChange={handleBannerImages} />
                            </Col>
                        </Row>
                        <Row>
                            {
                                products.length > 0 ?
                                    products.map((product, index) =>
                                        <Row key={index}>
                                            <Col>{product.name}</Col>
                                        </Row>
                                    ) : null
                            }
                            <Col>
                                <input type="file" name='products' className='form-control'
                                    onChange={handleProductImages} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='add-cat-btn-save' variant="primary" onClick={submitPageForm}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <>
            <Layout sidebar>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1%" }}>
                <h1>Page</h1>
                {renderCreatePageModal()}
                <button className='btn btn-outline-dark btn1' style={{width:"80px",height:"45px"}} onClick={() => setCreateModal(true)}> Create </button>
                </div>
            </Layout>
        </>
    )
}

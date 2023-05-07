import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {signup} from "../actions/userActions"




export const Signup = () => {
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const userSignup = (e) => {
        e.preventDefault();

        const user={
            firstName,lastName,phone,email,password
        }
        dispatch(signup(user))
    }

    if (auth.authenticate) {
        return <Redirect to={"/"} />
    };

    if(user.loading){
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <Layout>
                <Container>
                    <Row>
                        <Col style={{marginTop:"5%"}} md={{ span: 8, offset: 2 }}>
                            <form className='my-5' onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFirstName" className="form-label">First Name : </label>
                                            <input value={firstName} type="text" className="form-control" id="exampleFirstName" aria-describedby="FirstNameHelp" onChange={(e) => setFirstName(e.target.value)} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="mb-3">
                                            <label htmlFor="exampleLastName" className="form-label">Last Name : </label>
                                            <input type="text" value={lastName} className="form-control" onChange={(e) => setLastName(e.target.value)} id="exampleLastName" aria-describedby="LastNameHelp" />
                                        </div>
                                    </Col>
                                </Row>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" aria-describedby="PhoneHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}

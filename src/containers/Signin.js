import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Layout } from '../components/Layout';
import { login } from "../actions/authActions"
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Signin = () => {

    // const [errors,setErrors]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();
        const user = { email, password }
        dispatch(login(user));
    };

    if (auth.authenticate) {
        return <Redirect to={"/"} />
    };

    return (
        <div>
            <Layout>
                <Container>
                    <Row>
                        <Col style={{marginTop:"50px"}} md={{ span: 8, offset: 2 }}>
                            <form className='my-5' onSubmit={userLogin}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
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

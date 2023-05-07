import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signout } from '../actions/authActions';
import { Navbar } from 'react-bootstrap';



export const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const logout = () => {
        dispatch(signout())
    }

    const renderLoggedInLinks = () => {
        return (
            <Link className="btn btn-outline-dark mx-2" style={{fontWeight:"bold",border:"2px solid black"}} to="/signin" onClick={logout} >Signout</Link>
        )
    }

    const renderNonLoggedInLinks = () => {
        return (
            <>
                <Link className="btn btn-outline-success mx-2" to="/signin" >Signin</Link>
                <Link className="btn btn-outline-success mx-2" to="/signup">Signup</Link>
            </>
        )
    }

    return (
        <>
            <Navbar fixed='top' className="navbar navbar-expand-lg " style={{ zIndex: 1,backgroundColor:"darkCyan",fontWeight:"bold" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand"  to="/">Admin Dashboard</Link> 
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                </div>
                {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
            </Navbar>
        </>
    )
}

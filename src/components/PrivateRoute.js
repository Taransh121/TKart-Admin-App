import React from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom'

export const PrivateRoute = ({component:Component,...rest}) => {
  return <Route {...rest} component={(props)=>{
    const authToken=window.localStorage.getItem("authToken");
    if(authToken){
        return <Component {...props}/>
    }
    else{
        return <Redirect to={"/signin"}/>
    }

  }}/>
}

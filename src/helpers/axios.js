import axios from "axios";
import { api } from "../urlConfig";
import store from "../store";
import { authConstants } from "../actions/constants";

const authToken=window.localStorage.getItem("authToken")

const axiosInstance=axios.create({
    baseURL:api,
    headers:{
        "Authorization": authToken ? `Bearer ${authToken}` : "" 
    }
})

axiosInstance.interceptors.request.use((req)=>{
    const {auth}=store.getState();
    if(auth.authToken){
        req.headers.Authorization=`Bearer ${authToken}`;
    }
    return req;
})

axiosInstance.interceptors.response.use((res)=>{
    return res;
},(error)=>{
    console.log(error.response);
    const {status}=error.response;
    if(status===500){
        localStorage.clear();
        store.dispatch({type:authConstants.logout_success});
    }
    return Promise.reject(error)
})

export default axiosInstance;
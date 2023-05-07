import axios from "../helpers/axios";
import { categoryConstants, initialDataConstants, productConstants } from "./constants";


export const getInitialData=()=>{
    return async dispatch=>{
        dispatch({type:initialDataConstants.get_all_initialData_request})
        const res=await axios.post("/initialdata");
        console.log(res);
        if(res.status===200){
            const {categories,products}=res.data
            dispatch({
                type:categoryConstants.get_all_cat_success,
                payload:{categories}
            });
            dispatch({
                type:productConstants.get_all_products_success,
                payload:{products}
            })
        }
        else{
            dispatch({
                type:categoryConstants.get_all_cat_failure,
                payload:{error:res.data.error}
            })
            dispatch({
                type:productConstants.get_all_products_failure,
                payload:{error:res.data.error}
            })
        }
    }
}
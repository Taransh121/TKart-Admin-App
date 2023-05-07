import axios from "../helpers/axios";
import { pageConstants } from "./constants"

export const createPage=(form)=>{
    return async dispatch=>{
        dispatch({type:pageConstants.create_page_request});
        try{
            const res= await axios.post("/page/create",form);
            if(res.status===200){
                dispatch({
                    type:pageConstants.create_page_success,
                    payload:{page:res.data.page}
                })
            }
            else{
                dispatch({
                    type:pageConstants.create_page_failure,
                    payload:{error:res.data.error}
                })
            }
        }
        catch(error){
            console.log(error);
        }

    }
}
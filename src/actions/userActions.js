import axios from "../helpers/axios";
import {userConstants } from "./constants";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: userConstants.user_register_request })
        const res = await axios.post("/admin/signup", {
            ...user
        })

        if (res.status === 201) {
            const { message } = res.data;
            
            dispatch({
                type: userConstants.user_register_success,
                payload: {message}
            })
        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: userConstants.user_register_failure,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}
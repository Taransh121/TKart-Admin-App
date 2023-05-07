import axios from "../helpers/axios"
import { authConstants} from "./constants"

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.login_request })
        const res = await axios.post("/admin/signin", {
            ...user
        })

        if (res.status === 200) {
            const { authToken, user } = res.data;
            localStorage.setItem("authToken", authToken);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch({
                type: authConstants.login_success,
                payload: {
                    authToken, user
                }
            })
        }
        else {
            if (res.status === 400) {
                dispatch({
                    type: authConstants.login_failure,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        }
    }
}




export const isUserLoggedIn = () => {
    return async dispatch => {
        const authToken = localStorage.getItem('authToken');
        if(authToken){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.login_success,
                payload: {
                    authToken, user
                }
            });
        }else{
            dispatch({
                type: authConstants.login_failure,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout=()=>{
    return async dispatch=>{
        dispatch({type:authConstants.logout_request})
        const res=await axios.post("/admin/signout")

        if(res.status===200){
            localStorage.clear();
            dispatch({
                type:authConstants.logout_success
            })
        }
        else{
            dispatch({
                type:authConstants.logout_failure,
                paylaod:{error:res.data.error}
            })
        }
    }
}
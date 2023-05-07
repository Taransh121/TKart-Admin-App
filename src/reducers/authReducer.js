import { authConstants } from "../actions/constants"

const initialState = {
    authToken: "null",
    user: {
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
    },
    authenticate: false,
    authenticating: false,
    loading:false,
    error:null
}
const authRed= (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case authConstants.login_request:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.login_success:
            state = {
                ...state,
                user: action.payload.user,
                authToken: action.payload.authToken,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.logout_request:
            state = {
                ...state,
                loading:true
            }
            break;
        case authConstants.logout_success:
            state = {
                ...initialState
            }
            break;
        case authConstants.logout_failure:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        default:
            return state;
    }
    return (state);
}
export default authRed;
import { userConstants } from "../actions/constants";

const initialState = {
    error: null,
    message: "",
    loading: false
}
const userRed= (state = initialState, action) => {
    switch (action.type) {
        case userConstants.user_register_request:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.user_register_success:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.user_register_failure:
            state = {
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        default:
            return state;
    }
    return (state);
}

export default userRed;
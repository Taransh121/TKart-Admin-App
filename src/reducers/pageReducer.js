import { pageConstants } from "../actions/constants";

const initialState={
    error:null,
    loading:false,
    page:{}
}

const pageRed=(state=initialState,action)=>{
    switch (action.type) {
        case pageConstants.create_page_request:
            state={
                ...state,
                loading:true,
            }
        break;
        case pageConstants.create_page_success:
            state={
                ...state,
                loading:false,
            }
        break;
        case pageConstants.create_page_failure:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
        break;
        default:
            return state;
    }
    return state;
}
export default pageRed;
import { productConstants } from "../actions/constants";

const initialState = {
    products: []
}

const productRed=(state = initialState, action) => {
    switch (action.type) {
        case productConstants.get_all_products_success:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
        default:
            return state;
    }
    return state;
}
export default productRed;
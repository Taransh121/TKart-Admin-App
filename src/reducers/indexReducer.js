import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import pageReducer from "./pageReducer";

const rootReducer=combineReducers({
    auth:authReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    order:orderReducer,
    page:pageReducer
});
export default rootReducer;
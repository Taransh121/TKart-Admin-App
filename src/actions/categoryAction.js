import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({ type: categoryConstants.get_all_cat_request })
        const res = await axios.post("/category/getcategories");
        console.log(res);
        if (res.status === 200) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.get_all_cat_success,
                payload: { categories: categoryList }
            })
        }
        else {
            dispatch({
                type: categoryConstants.get_all_cat_failure,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.add_cat_request });
        try {
            const res = await axios.post("/category/create", form)
            console.log(res);
            if (res.status === 200 && 201) {
                dispatch({
                    type: categoryConstants.add_cat_success,
                    payload: { category: res.data.category }
                })
            }
            else {
                dispatch({
                    type: categoryConstants.add_cat_failure,
                    payload: { error: res.data.error },
                })
            }
        }
        catch (error) {
            console.log(error.response);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.update_cat_request })
        try {
            const res = await axios.post("/category/update", form)
            console.log(res);
            if (res.status === 200 && 201) {
                dispatch({ type: categoryConstants.update_cat_success })
            }
            else {
                dispatch({
                    type: categoryConstants.update_cat_failure,
                    payload: { error: res.data.error },
                })
            }
        }
        catch (error) {
            console.log(error.response);
        }
    }
}


export const deleteCategoriesAction = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.delete_cat_request })
        try {

            const res = await axios.post("/category/delete", {
                payload: { ids }
            });
            console.log(res);
            if (res.status === 200 && 201) {
                dispatch({ type: categoryConstants.delete_cat_success })
            }
            else {
                dispatch({ type: categoryConstants.delete_cat_failure })
            }
        }
        catch (error) {
            console.log(error.response);
        }
    }
}



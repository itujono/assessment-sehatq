import * as types from "../types"
import { instance } from "../../utils"

export const fetchCategories = () => dispatch => {
    return instance
        .get("home")
        .then(({ data }) => {
            console.log({ data: data.data })
            dispatch({ type: types.FETCH_CATEGORIES, payload: data[0].data.category })
        })
        .catch(err => {
            console.error(err.response)
            dispatch({ type: types.FETCH_CATEGORIES_ERROR })
        })
}

export const fetchPromoProducts = () => dispatch => {
    return instance
        .get("home")
        .then(({ data }) => {
            console.log({ data: data.data })
            dispatch({ type: types.FETCH_PROMO_PRODUCTS, payload: data[0].data.productPromo })
        })
        .catch(err => {
            console.error(err.response)
            dispatch({ type: types.FETCH_PROMO_PRODUCTS_ERROR })
        })
}

export const buyProduct = item => ({
    type: types.BUY_PRODUCT,
    payload: item
})

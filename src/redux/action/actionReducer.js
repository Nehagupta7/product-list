import { ALL_PRODUCTS ,PRODUCT_ERROR, SINGLE_PRODUCTS} from "../type";

export const getProductData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: "error message",
    });
  }
};
export const getSingleProductData = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: "error message",
    });
  }
};
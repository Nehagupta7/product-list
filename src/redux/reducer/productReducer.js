import { ALL_PRODUCTS ,PRODUCT_ERROR, SINGLE_PRODUCTS} from "../type";

const initialState = {
  productList: [],
  single:{},
  loading: true,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };

    case PRODUCT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
      case SINGLE_PRODUCTS:
        return {
          ...state,
          single: action.payload,
          loading: false,
        };
    default:
      return state;
  }
};

export default productReducer;

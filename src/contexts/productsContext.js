import React, { useReducer } from "react";
import axios from "axios";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  pages: 0,
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 5),
      };
    default:
      return state;
  }
}

const API = "https://backend-for-fs-makers.herokuapp.com/api/v1";

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getProducts() {
    try {
      const res = await axios(`${API}/products/${window.location.search}`);
      // console.log(res);
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProduct(id) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      await axios.delete(`${API}/products/${id}/`, config);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  }
  async function createProduct(formData) {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.post(`${API}/products/`, formData, config);
      console.log(res);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        pages: state.pages,
        getProducts,
        deleteProduct,
        createProduct,
      }}>
      {children}
    </productsContext.Provider>
  );
};
export default ProductsContextProvider;

import React, { useReducer, useState } from "react";
import axios from "axios";

export const productsContext = React.createContext();

const INIT_STATE = {
  products: [],
  pages: 0,
  categories: [],
  oneProduct: null,
  favorites: [],
};
function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 5),
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_ONE_PRODUCT":
      return {
        ...state,
        oneProduct: action.payload,
      };
    case "GET_FAVORITES":
      return {
        ...state,
        favorites: action.payload.results,
        pages: Math.ceil(action.payload.count / 5),
      };
    default:
      return state;
  }
}

const API = "https://backend-for-fs-makers.herokuapp.com/api/v1";

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [loading, setLoading] = useState(false);
  async function getProducts() {
    // setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(
        `${API}/products/${window.location.search}`,
        config
      );
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  async function createProduct(formData) {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  async function getCategories() {
    setLoading(true);
    try {
      const res = await axios(`${API}/category/list/`);
      dispatch({
        type: "GET_CATEGORIES",
        payload: res.data.results,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function getOneProduct(id) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(`${API}/products/${id}`, config);
      console.log(res);
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function createReview(newReview) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.post(`${API}/reviews/`, newReview, config);
      console.log(res);
      getOneProduct(newReview.product);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function deleteReview(reviewId, productId) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.delete(`${API}/reviews/${reviewId}`, config);
      console.log(res);
      getOneProduct(productId);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }
  async function updateReview(editedReview, reviewId) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(
        `${API}/reviews/${reviewId}/`,
        editedReview,
        config
      );
      console.log(res);
      getOneProduct(editedReview.product);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }
  async function toggleLike(id) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(`${API}/products/${id}/toggle_like/`, config);
      getOneProduct(id);
      getProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }
  async function toggleFavorites(id) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(
        `${API}/products/${id}/toggle_favorites/`,
        config
      );
      // getOneProduct(id);
      getProducts();
      getFavorites();
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }
  async function updateProduct(formData, id) {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(`${API}/products/${id}/`, formData, config);
      console.log(res);
      getProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function getFavorites() {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const Authorization = `Bearer ${token.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(`${API}/favorites/`, config);
      dispatch({
        type: "GET_FAVORITES",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <productsContext.Provider
      value={{
        products: state.products,
        pages: state.pages,
        categories: state.categories,
        loading,
        oneProduct: state.oneProduct,
        favorites: state.favorites,
        getProducts,
        deleteProduct,
        createProduct,
        getCategories,
        getOneProduct,
        createReview,
        toggleLike,
        toggleFavorites,
        deleteReview,
        updateProduct,
        updateReview,
        getFavorites,
      }}>
      {children}
    </productsContext.Provider>
  );
};
export default ProductsContextProvider;

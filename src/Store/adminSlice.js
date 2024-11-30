import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const your_url = "abcd";

const initialState = {
  products: [],
  orders: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    setOrders(state, action) {
      state.orders=action.payload;
      state.loading = false;
    },
    updateProductStatus(state, action) {
      const { id, updatedData } = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === id);
      if (productIndex > -1) {
        state.products[productIndex] = { ...state.products[productIndex], ...updatedData };
      }
      state.loading = false;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
      state.loading = false;
    },
    removeProduct(state, action) {
      const productId = action.payload;
      state.products = state.products.filter((product) => product.id !== productId);
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setOrders,
  updateProductStatus,
  addProduct,
  removeProduct,
} = adminSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/products.json`);
    const data = response.data || {};

    const products = Object.entries(data).flatMap(([category, categoryProducts]) =>
      Object.entries(categoryProducts).map(([id, product]) => ({
        id,
        category,
        ...product,
      }))
    );

    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(`Error fetching products: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProductToDatabase = (productData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const productId = Date.now().toString();
    await axios.put(`${your_url}/products/${productData.Category}/${productId}.json`, productData);
    dispatch(addProduct({ ...productData, id: productId }));
  } catch (error) {
    dispatch(setError(`Error adding product: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProductFromDatabase = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`${your_url}/products/${product.category}/${product.id}.json`);
    dispatch(removeProduct(product.id));
  } catch (error) {
    dispatch(setError(`Error deleting product: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProductInDatabase = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { id, category, ...updatedData } = product;
    await axios.patch(`${your_url}/products/${category}/${id}.json`, updatedData);
    dispatch(updateProductStatus({ id, updatedData }));
  } catch (error) {
    dispatch(setError(`Error updating product: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchOrders = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${your_url}/orders.json`);
    const data = response.data || {};
    const orders = Object.entries(data).flatMap(([userId, userOrders]) =>
      Object.entries(userOrders).map(([orderId, orderData]) => ({
        orderId,
        userId,
        ...orderData,
      }))
    );

    dispatch(setOrders(orders));
  } catch (error) {
    dispatch(setError(`Error fetching orders: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateOrderStatus = (order, status) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.patch(`${your_url}/orders/${order.userId}/${order.orderId}.json`, { ...order,status: status });
    dispatch(fetchOrders());
  } catch (error) {
    dispatch(setError(`Error updating order status: ${error.message}`));
  } finally {
    dispatch(setLoading(false));
  }
};

export default adminSlice.reducer;

import axios from "../../services/axios";
import { CART_CLEAR_ITEMS } from "../constants/CartConstants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/OrderConstants";

// CREATE ORDER ACTION
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post(`/orders`, order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS, payload: data });
    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
   
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

// GET ORDER DETAIL ACTION
export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });


    const { data } = await axios.get(`/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
  
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER PAY
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

    
      const { data } = await axios.put(
        `/orders/${orderId}/pay`,
        paymentResult
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

// USER ORDERS
export const listMyOrderAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

 

    const { data } = await axios.get(`/orders/`);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
   
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const deleteOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELETE_REQUEST,
    });



    const { data } = await axios.delete(`/orders/${id}`);
    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
   
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: message,
    });
  }
};

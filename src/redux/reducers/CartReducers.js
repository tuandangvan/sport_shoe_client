import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";

const stateDefault = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: {},
};

export const cartReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (match) => match.product.id === item.product.id && match.typeSelect.color === item.typeSelect.color && match.typeSelect.size === item.typeSelect.size 
      );
      if (existItem) return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        ),
      };


      else {
      
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product.id !== action.payload.id || x.typeSelect!== action.payload.typeSelect  ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

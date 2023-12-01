import { configureStore } from "@reduxjs/toolkit";
const productList = [
  {
    number: "1",
    name: "Slim Shirt",
    price: 60,
    description: "Slim Shirt description",
    quantity: 10,
    reviewa: [
      {
        name: "John",
        rate: 4,
        comment: "Good",
      },
      {
        name: "John",
        rate: 4,
        comment: "Good",
      },
    ],
  },
  {
    number: "2",
    name: "Fit Shirt 2",
    price: 50,
    description: "Fit Shirt description 2",
    quantity: 20,
    reviewa: [
      {
        name: "John",
        rate: 4,
        comment: "Good",
      },
      {
        name: "John",
        rate: 4,
        comment: "Good",
      },
    ],
  },
];
const cartItems = [];

const admin = false;

const shoppingStore = (
  state = {
    productList: productList,
    cart: cartItems,
    user: {},
    paymentInfo: {},
    isAdmin: admin,
  },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      console.log("item", item);
      const product = state.productList.find(
        (x) => x.number === item.productId
      );
      const exist = state.cart.find((x) => x.productId === item.productId);
      if (exist) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.productId === exist.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((x) => x.productId !== action.payload),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((x) =>
          x.productId === action.payload.productId
            ? { ...x, quantity: action.payload.value }
            : x
        ),
      };
    case "UPDATE_PRODUCT_LIST":
      return {
        ...state,
        productList: action.payload,
      };

    case "SET_ADMIN":
      console.log("action.payload", action.payload);
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_PAYMENT":
      return {
        ...state,
        paymentInfo: action.payload,
      };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: shoppingStore,
});

export default store;

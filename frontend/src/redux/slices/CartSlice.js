const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map(item => {
        if (item.title == action.payload.title) {
          isItemExist = true;
          //incrementa +1 el producto
          item.qty = item.qty + 1;
        }
        /* if ( item.qty < action.payload.stock ){
          item.qty = item.qty + 1;
        } */
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }

      state.data = tempData;
    },
    reduceItemFromCart(state, action) {
      let tempData = state.data;

      tempData.map(item => {
        if (item.title == action.payload.title) {
          item.qty = item.qty - 1;
        }
      });

      state.data = tempData;
    },
    removeItemFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);

      state.data = tempData;
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
  },
});
export const {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
  emptyCart,
} = CartSlice.actions;
export default CartSlice.reducer;

const {createSlice} = require('@reduxjs/toolkit');

const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
  },
  reducers: {
    /* addItemToWishlist(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map(item => {
        if (item.id == action.payload.id) {
          isItemExist = true;
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }

      state.data = tempData;
    }, */
    addItemToWishlist(state, action) {
      let tempData = state.data;
      let isItemExist = false;

      tempData.map(item => {
        if (item.title == action.payload.title) {
          isItemExist = true;
        }
      });

      if (!isItemExist) {
        tempData.push(action.payload);
      }

      state.data = tempData;
    },
    reduceItemFromWishlist(state, action) {
      let tempData = state.data;

      tempData.map(item => {
        if (item.id == action.payload.id) {
          item.qty = item.qty - 1;
        }
      });

      state.data = tempData;
    },
    removeItemFromWishlist(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);

      state.data = tempData;
    },
    emptyWishlist(state, action) {
      state.data = action.payload;
    }
  },
});
export const {
  addItemToWishlist, 
  reduceItemFromWishlist, 
  removeItemFromWishlist,
  emptyWishlist} = WishlistSlice.actions;
export default WishlistSlice.reducer;

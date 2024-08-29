import { createSlice } from "@reduxjs/toolkit";

export const slicePopupReducer = createSlice({
  name: "PopupReducer",
  initialState: {
    modal: { modalType: "", showModal: false, buyModal: false },
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.modal = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
const { fetched } = slicePopupReducer.actions;

export const SetPopupReducerData = (data) => async (dispatch) => {
  if (!data) throw Error("missing Data parameter");
  dispatch(fetched({ data }));
};

export default slicePopupReducer.reducer;

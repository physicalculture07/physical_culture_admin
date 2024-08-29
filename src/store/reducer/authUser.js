import { createSlice } from "@reduxjs/toolkit";

export const sliceAuthUser = createSlice({
  name: "authUser",
  initialState: {
    data: {},
  },
  reducers: {
    fetcheddata: (state, { payload }) => {
      state.data = payload.data;
    },

    logout: (state) => {
      state.data = sliceAuthUser.getInitialState().data;
    },
  },
});

export const { fetcheddata, logout } = sliceAuthUser.actions;

export const SetUserData = (data) => async (dispatch) => {
  // if (!data) throw Error("missing Data parameter");
  dispatch(fetcheddata({ data }));
};

export const LogoutUser = () => (dispatch) => {
  dispatch(logout({}));
};

export default sliceAuthUser.reducer;

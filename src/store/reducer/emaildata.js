import { createSlice } from "@reduxjs/toolkit";

export const sliceEmail = createSlice({
  name: "emaildata",
  initialState: {
    data: {},
    selectemail: {},
    status: {},
    mailstatus: {},
    selectedmesage: {},
  },
  reducers: {
    fetched: (state, { payload }) => {
      state.data = payload.data;
    },
    recevierdata: (state, { payload }) => {
      state.data = payload.data;
    },
    selectedEmail: (state, { payload }) => {
      state.selectemail = payload;
    },
    status: (state, { payload }) => {
      state.status = payload;
    },
    selectedmesage: (state, { payload }) => {
      state.selectedmesage = payload;
    },
    mailstatus: (state, { payload }) => {
      state.mailstatus = payload;
    },
  },
});

export const {
  fetched,
  recevierdata,
  selectedEmail,
  status,
  selectedmesage,
  mailstatus,
} = sliceEmail.actions;

export const SetSenderData = (data) => async (dispatch) => {
  // if (!data) throw Error("missing Data parameter");
  dispatch(fetched({ data }));
};

export const SetRecevierData = (data) => async (dispatch) => {
  // if (!data) throw Error("missing Data parameter");
  dispatch(recevierdata({ data }));
};

export const setSelectedEmail = (data) => async (dispatch) => {
  dispatch(selectedEmail({ data }));
};

export const setStatus = (data) => async (dispatch) => {
  dispatch(status({ data }));
};

export const setmailStatus = (data) => async (dispatch) => {
  dispatch(mailstatus({ data }));
};

export const setselectedmesage = (data) => async (dispatch) => {
  dispatch(selectedmesage({ data }));
};

export default sliceEmail.reducer;

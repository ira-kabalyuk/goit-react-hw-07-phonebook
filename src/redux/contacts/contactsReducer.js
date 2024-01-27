
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestContacts, addContactRequest } from "services/api";
import { STATUSES } from "utils/constants";

export const apiGetContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkApi) => {
  try {
    const contacts = await requestContacts();
    return contacts; // записується Action Payload
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
});

export const apiPostContact = createAsyncThunk("contacts/addContact", async ({ name, phone }, thunkApi) => {
  try {
    const contacts = await addContactRequest(name, phone);
    return contacts; // записується Action Payload
  } catch (error) {
    return thunkApi.rejectWithValue(error.message)
  }
});

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
    status: STATUSES.idle,
  },
  filter: '', 
}

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },

  // пiдписуємось на статуси санки
  extraReducers: (builder) => builder
    .addCase(apiGetContacts.pending, (state, action) => {
      state.contacts.status = STATUSES.pending;
      state.contacts.error = null;
    })
    .addCase(apiGetContacts.fulfilled, (state, action) => {
      state.contacts.status = STATUSES.success;
      state.contacts.items = action.payload;
    })
    .addCase(apiGetContacts.rejected, (state, action) => {
      state.contacts.status = STATUSES.error;
      state.contacts.error = action.payload;
    })
    .addCase(apiPostContact.pending, (state) => {
      state.contacts.status = STATUSES.pending;
      state.contacts.error = null;
    })
    .addCase(apiPostContact.fulfilled, (state, action) => {
      state.contacts.status = STATUSES.success;
      state.contacts.items = Array.isArray(action.payload) ? action.payload : [action.payload];
    })   
    .addCase(apiPostContact.rejected, (state, action) => {
      state.contacts.status = STATUSES.error;
      state.contacts.error = action.payload;
    })
});

export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

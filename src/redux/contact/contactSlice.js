import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as contactService from "../../services/contactService";
import { handleApiError } from "../../utils/APIErrorHandler";

const initialState = {
  contacts: [],
  status: "idle",
  error: null,
};

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async (_, { rejectWithValue }) => {
  try {
    const response = await contactService.getContacts();
    return response.data.contacts;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const removeContact = createAsyncThunk("contacts/removeContact", async (contact, { rejectWithValue }) => {
  try {
    await contactService.deleteContact(contact);
    toast.success("Contact deleted successfully.");
    return contact._id;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

// Slice
const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Contacts
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Contact
      .addCase(removeContact.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;

const selectContactsState = (state) => state.contacts || initialState;

export const selectContacts = createSelector([selectContactsState], (contactsState) => contactsState.contacts);

export const selectContactsStatus = createSelector([selectContactsState], (contactsState) => contactsState.status);

export const selectContactsError = createSelector([selectContactsState], (contactsState) => contactsState.error);

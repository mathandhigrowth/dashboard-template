import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as bookingService from "../../services/bookingService";
import { handleApiError } from "../../utils/APIErrorHandler";

const initialState = {
  bookings: [],
  status: "idle",
  error: null,
};

export const fetchBookings = createAsyncThunk("bookings/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await bookingService.getBookings();
    return response.data.bookings;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const fetchBookingById = createAsyncThunk("bookings/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await bookingService.getBookingById(id);
    return response.data.booking;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const editBooking = createAsyncThunk("bookings/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await bookingService.updateBooking(id, data);
    toast.success("Booking updated successfully");
    return response.data.booking;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const removeBooking = createAsyncThunk("bookings/delete", async (id, { rejectWithValue }) => {
  try {
    await bookingService.deleteBooking(id);
    toast.success("Booking deleted successfully");
    return id;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

// Slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update
      .addCase(editBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })

      // Delete
      .addCase(removeBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;

const selectBookingState = (state) => state.bookings || initialState;

export const selectAllBookings = createSelector([selectBookingState], (state) => state.bookings);

export const selectBookingsStatus = createSelector([selectBookingState], (state) => state.status);

export const selectBookingsError = createSelector([selectBookingState], (state) => state.error);

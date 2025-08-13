import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as launchService from "../../services/launchService";
import { handleApiError } from "../../utils/APIErrorHandler";

const initialState = {
  status: {
    launched: false,
    isReachedBottom: false,
  },
  fetchStatus: "idle",
  updateStatus: "idle", 
  error: null,
};

export const fetchLaunchStatus = createAsyncThunk("launch/fetchStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await launchService.getLaunchStatus();
    return response.data;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error("Failed to fetch launch status.");
    return rejectWithValue(errorMsg);
  }
});

export const updateLaunchStatus = createAsyncThunk("launch/updateStatus", async (data, { rejectWithValue }) => {
  try {
    const response = await launchService.updateLaunchStatus(data);
    toast.success("Website status updated successfully!");
    return response.data;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

const launchSlice = createSlice({
  name: "launch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching status
      .addCase(fetchLaunchStatus.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchLaunchStatus.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.status = action.payload;
      })
      .addCase(fetchLaunchStatus.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })
      // Updating status
      .addCase(updateLaunchStatus.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateLaunchStatus.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.status = action.payload;
      })
      .addCase(updateLaunchStatus.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default launchSlice.reducer;

const selectLaunchState = (state) => state.launch || initialState;

export const selectCurrentLaunchStatus = createSelector([selectLaunchState], (state) => state.status);
export const selectLaunchFetchStatus = createSelector([selectLaunchState], (state) => state.fetchStatus);
export const selectLaunchUpdateStatus = createSelector([selectLaunchState], (state) => state.updateStatus);

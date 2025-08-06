import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import * as authService from "../../services/authService";
import { handleApiError } from "../../utils/APIErrorHandler";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await authService.register(userData);
    toast.success("Registration successful!");
    return response.data;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await authService.login(credentials);
    return response.data;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.logout();
    return response.data;
  } catch (error) {
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    return rejectWithValue(errorMsg);
  }
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const response = await authService.getMe();
    return response.data;
  } catch (error) {
    const errorMsg = handleApiError(error);
    return rejectWithValue(errorMsg);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
    tokenRefreshed: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.user && payload?.accessToken) {
          state.status = "succeeded";
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          state.status = "failed";
          state.error = "Invalid registration response from server.";
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = typeof action.payload === "string" ? action.payload : action.payload?.message || "Registration failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.user && payload?.accessToken) {
          state.status = "succeeded";
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
          state.error = null;
        } else {
          state.status = "failed";
          state.error = "Invalid login response from server.";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = typeof action.payload === "string" ? action.payload : action.payload?.message || "Login failed";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = typeof action.payload === "string" ? action.payload : action.payload?.message || "Logout failed";
      })

      // Fetch Me
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload?.user) {
          state.user = payload.user;
          state.isAuthenticated = true;
          state.status = "succeeded";
        } else {
          state.status = "failed";
          state.error = "Invalid user session.";
        }
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = typeof action.payload === "string" ? action.payload : action.payload?.message || "Session expired";
      });
  },
});

export const { logout, tokenRefreshed } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
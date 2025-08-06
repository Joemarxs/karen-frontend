// features/booking/bookingSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface BookingState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BookingState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunk to post booking
export const bookTour = createAsyncThunk(
  'booking/bookTour',
  async (
    bookingData: { name: string; email: string; date: string; time: string; guests: string },
    thunkAPI
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/book-tour/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to book tour');
      }

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookTour.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bookTour.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;

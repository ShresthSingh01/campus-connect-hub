import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  resourceName: string;
  resourceType: 'classroom' | 'lab' | 'auditorium' | 'sports';
  startTime: string;
  endTime: string;
  bookedBy: string;
  purpose: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface BookingsState {
  items: Booking[];
  isLoading: boolean;
  selectedDate: Date | null;
}

const initialState: BookingsState = {
  items: [],
  isLoading: false,
  selectedDate: new Date(),
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.items = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBookings, setSelectedDate, setLoading } = bookingsSlice.actions;
export default bookingsSlice.reducer;

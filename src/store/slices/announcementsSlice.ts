import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'events' | 'general';
  priority: 'low' | 'medium' | 'high';
  isPinned: boolean;
  author: {
    name: string;
    role: string;
  };
  createdAt: string;
  tags: string[];
}

interface AnnouncementsState {
  items: Announcement[];
  isLoading: boolean;
  filter: string;
  category: string | null;
}

const initialState: AnnouncementsState = {
  items: [],
  isLoading: false,
  filter: '',
  category: null,
};

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => {
      state.items = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAnnouncements, setFilter, setCategory, setLoading } = announcementsSlice.actions;
export default announcementsSlice.reducer;

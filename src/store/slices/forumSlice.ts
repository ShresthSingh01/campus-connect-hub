import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  votes: number;
  commentCount: number;
  createdAt: string;
  tags: string[];
  isBookmarked: boolean;
}

interface ForumState {
  threads: ForumThread[];
  isLoading: boolean;
  sortBy: 'new' | 'top' | 'trending';
  filter: string;
}

const initialState: ForumState = {
  threads: [],
  isLoading: false,
  sortBy: 'new',
  filter: '',
};

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setThreads: (state, action: PayloadAction<ForumThread[]>) => {
      state.threads = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'new' | 'top' | 'trending'>) => {
      state.sortBy = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const thread = state.threads.find(t => t.id === action.payload);
      if (thread) {
        thread.isBookmarked = !thread.isBookmarked;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setThreads, setSortBy, setFilter, toggleBookmark, setLoading } = forumSlice.actions;
export default forumSlice.reducer;

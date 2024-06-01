import {createSlice} from '@reduxjs/toolkit';

import {fetchPhotos} from '../app/store/actions';

export type SliceState = {
  photos: Photo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  page: number;
  query: string;
  limit: number;
  isReachedLastElement: boolean;
};

const initialState: SliceState = {
  photos: [],
  status: 'idle',
  error: undefined,
  page: 1,
  query: '',
  limit: 12,
  isReachedLastElement: false,
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhotos.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photos = action.payload;
        state.isReachedLastElement = state.photos.length % state.limit > 0;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setPage} = rootSlice.actions;
export default rootSlice.reducer;

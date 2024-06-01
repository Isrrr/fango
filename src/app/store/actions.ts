import {createAsyncThunk} from '@reduxjs/toolkit';

import {setPage, type SliceState} from '../../entity/photos';
import {AppDispatch} from '../../shared/storage/redux';

type FetchProps = {page?: number; limit?: number; query?: string};

export const fetchPhotos = createAsyncThunk<
  Photo,
  FetchProps,
  {state: SliceState; dispatch: AppDispatch}
>(
  'photos',
  async ({page = 1, limit = 12, query = ''}, {getState, dispatch}) => {
    dispatch(setPage(page));

    const state = getState();

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}&title_like=${query}`,
    );
    const data = await response.json();

    if (page === 1) {
      return data;
    } else {
      return state.photos.concat(data);
    }
  },
);

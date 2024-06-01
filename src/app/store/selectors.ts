import {type RootState} from '../../shared/storage/redux';

export const getPhotosFromStore = (state: RootState): Photo[] => state.photos;

export const isPhotosLoading = (state: RootState): boolean =>
  state.status === 'loading';

export const getPage = (state: RootState): number => state.page;

export const getIsReachedLastElement = (state: RootState): boolean =>
  state.isReachedLastElement;

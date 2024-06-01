import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {NativeModules} from 'react-native';

import {MainScreen} from './MainScreen';

import {type AppDispatch} from '../shared/storage/redux';
import {fetchPhotos} from '../app/store/actions';

const {LiveActivity} = NativeModules;

export const SplashScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    LiveActivity.startActivity();

    dispatch(fetchPhotos({}));
  }, [dispatch]);

  return <MainScreen />;
};

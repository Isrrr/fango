import React, {useCallback} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {AppDispatch} from '../shared/storage/redux';
import {fetchPhotos} from '../app/store/actions';
import {PhotosItem, SearchPhotos} from '../features';
import {
  getIsReachedLastElement,
  getPage,
  getPhotosFromStore,
  isPhotosLoading,
} from '../app/store/selectors';

const keyExtractor = (item: Photo) => item.id + item.title;

export const MainScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const photos = useSelector(getPhotosFromStore);
  const isLoading = useSelector(isPhotosLoading);
  const page = useSelector(getPage);
  const isReachedLastElement = useSelector(getIsReachedLastElement);

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(({contentOffset}) => {
    translateY.value = contentOffset.y;
  });

  const handleReset = useCallback(() => {
    dispatch(fetchPhotos({page: 1}));
  }, [dispatch]);

  const handleEndReached = useCallback(() => {
    if (isLoading || isReachedLastElement) {
      return;
    }

    dispatch(fetchPhotos({page: page + 1}));
  }, [dispatch, isLoading, page, isReachedLastElement]);

  const handleFind = useCallback(
    (query: string) => {
      dispatch(fetchPhotos({page: 1, query}));
    },
    [dispatch],
  );

  const renderItem = ({item, index}: {item: Photo; index: number}) => (
    <PhotosItem item={item} translateY={translateY} index={index} />
  );

  const ListEmptyComponent = <Text>List is empty...</Text>;

  const ListFooterComponent = isLoading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : null;

  return (
    <View style={styles.base}>
      <SearchPhotos onFind={handleFind} onReset={handleReset} />
      <Animated.FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews
        contentContainerStyle={styles.content}
        onEndReachedThreshold={0.6}
        onEndReached={handleEndReached}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        initialNumToRender={12}
        onScroll={scrollHandler}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 16,
    rowGap: 8,
  },
});

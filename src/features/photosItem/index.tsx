import React from 'react';
import {Image, Text, Pressable, Alert, NativeModules} from 'react-native';
import Animated, {type SharedValue} from 'react-native-reanimated';

import {usePhotoImageSerialize, usePhotoItem} from './hooks';
import {styles} from './styles';

const {LiveActivity} = NativeModules;

interface PhotoProps {
  item: Photo;
  translateY: SharedValue<number>;
  index: number;
}

export const PhotosItem = ({item, translateY, index}: PhotoProps) => {
  const rStyle = usePhotoItem({index: index, translateY: translateY});

  const {getSerializedPhoto} = usePhotoImageSerialize({
    imageUrl: item.thumbnailUrl,
  });

  const handleAlertPress = async () => {
    const photo = await getSerializedPhoto();

    LiveActivity.updateActivity(item.title, photo);
  };

  const handlePress = () => {
    Alert.alert(`${item.title}`, 'Отобразить элемент в виджете?', [
      {
        text: 'Да',
        onPress: handleAlertPress,
      },
      {text: 'Отмена'},
    ]);
  };

  return (
    <Animated.View style={rStyle}>
      <Pressable style={styles.item} onPress={handlePress}>
        <Image
          style={styles.image}
          source={{
            uri: item.thumbnailUrl,
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
    </Animated.View>
  );
};

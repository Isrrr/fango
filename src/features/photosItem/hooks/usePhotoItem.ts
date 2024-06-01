import {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

const height = 68;

interface PhotoItemProps {
  index: number;
  translateY: SharedValue<number>;
}

export const usePhotoItem = ({index, translateY}: PhotoItemProps) => {
  const inputRange = [index * height, (index + 1) * height];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      inputRange,
      [1, 0.8],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      translateY.value,
      inputRange,
      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale}],
      opacity: opacity,
    };
  });

  return rStyle;
};

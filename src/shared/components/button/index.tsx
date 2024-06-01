import React from 'react';
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  Text,
  type ViewStyle,
} from 'react-native';

import {styles} from './styles';

interface ButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({title, style, ...props}: ButtonProps) => {
  return (
    <Pressable style={[styles.base, style]} {...props}>
      <Text>{title}</Text>
    </Pressable>
  );
};

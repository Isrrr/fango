import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  image: {
    borderWidth: 1,
    borderRadius: 4,
    width: 60,
    height: 60,
  },
  title: {
    flex: 1,
  },
});

import React from 'react';
import {View, TextInput, Button} from 'react-native';

import {styles} from './styles';

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onFind: () => void;
  onReset: () => void;
  isFindDisabled: boolean;
  isResetDisabled: boolean;
}

export const Search = ({
  value,
  onChangeText,
  onFind,
  onReset,
  isFindDisabled,
  isResetDisabled,
}: SearchProps) => {
  return (
    <View style={styles.search}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Try to find smth..."
        autoCapitalize="none"
      />
      <Button title="Find" onPress={onFind} disabled={isFindDisabled} />
      <Button title="Reset" onPress={onReset} disabled={isResetDisabled} />
    </View>
  );
};

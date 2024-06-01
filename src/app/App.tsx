import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import store from '../shared/storage/redux';
import {SplashScreen} from '../screens/SplashScreen';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView
          edges={['top', 'left', 'right']}
          mode="padding"
          style={styles.base}>
          <StatusBar />
          <SplashScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export default App;

import React, {useEffect, useState, useRef} from 'react';
import {AppState} from 'react-native';

import {useSearchTimer} from './hooks/useSearchTimer';

import {Search} from '../../shared';
import {mmkvStorage} from '../../shared/storage/mmkv';

interface SearcProps {
  onFind: (query: string) => void;
  onReset: () => void;
}

export const SearchPhotos = ({onFind, onReset}: SearcProps): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const [isResetDisabled, setIsResetDisabled] = useState<boolean>(false);
  const appState = useRef(AppState.currentState);

  const searchTimer = useSearchTimer(setIsResetDisabled);

  useEffect(() => {
    const isReset = mmkvStorage.getBoolean('RESET_STATE');

    if (isReset !== undefined) {
      setIsResetDisabled(isReset);
    }

    searchTimer();
  }, [searchTimer]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        searchTimer();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [searchTimer]);

  const handleChangeText = (text: string) => {
    setQuery(text);
  };

  const handleFind = () => {
    onFind(query);
  };

  const handleReset = async () => {
    setIsResetDisabled(true);
    mmkvStorage.set('TIMESTAMP', Date.now());
    mmkvStorage.set('RESET_STATE', true);

    setQuery('');
    onReset();
  };

  return (
    <Search
      value={query}
      isFindDisabled={!query}
      isResetDisabled={isResetDisabled}
      onChangeText={handleChangeText}
      onFind={handleFind}
      onReset={handleReset}
    />
  );
};

import {mmkvStorage} from '../../../shared/storage/mmkv';

export const useSearchTimer = (
  setIsResetDisabled: (value: boolean) => void,
) => {
  const searchTimer = () => {
    const newTimeStamp = Date.now();
    const timeStamp = mmkvStorage.getNumber('TIMESTAMP');
    let timestampsDiff = 0;

    if (timeStamp) {
      timestampsDiff = 30000 - (newTimeStamp - timeStamp);

      if (timestampsDiff > 0) {
        setTimeout(() => {
          setIsResetDisabled(false);
          mmkvStorage.set('RESET_STATE', false);
        }, timestampsDiff);
      } else {
        setIsResetDisabled(false);
        mmkvStorage.set('RESET_STATE', false);
      }
    }
  };

  return searchTimer;
};

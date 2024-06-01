interface PhotoImageSerialize {
  imageUrl: string;
}

export const usePhotoImageSerialize = ({imageUrl}: PhotoImageSerialize) => {
  const getSerializedPhoto = async () => {
    try {
      const response = await fetch(imageUrl);

      const blob = await response.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Ошибка:', error);
      return null;
    }
  };

  return {getSerializedPhoto};
};

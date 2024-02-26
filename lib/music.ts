export const getAudioDuration = async (file: File) => {
  return new Promise<number>((resolve) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      resolve(audio.duration);
    };
  });
};

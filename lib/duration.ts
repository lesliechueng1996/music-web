export const secondsToMinutes = (seconds: number) => {
  const integerSeconds = Math.floor(seconds);
  const minutes = Math.floor(integerSeconds / 60);
  const remainingSeconds = integerSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const secondsToLyricTime = (seconds: number) => {
  const integerSeconds = Math.floor(seconds);
  const minutes = Math.floor(integerSeconds / 60);
  const remainingSeconds = integerSeconds % 60;
  const diff = seconds - integerSeconds;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${Math.floor(
    diff * 100
  )
    .toString()
    .padStart(2, '0')}`;
};

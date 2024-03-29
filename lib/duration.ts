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

export const findLyricIndex = (lyricLines: { time: string; text: string }[], currentTime: number) => {
  const lyricTime = secondsToLyricTime(currentTime);
  return lyricLines.findIndex((line, index) => {
    if (index === lyricLines.length - 1) {
      return true;
    }
    const nextLine = lyricLines[index + 1];
    return line.time <= lyricTime && nextLine.time > lyricTime;
  });
};

export const lyricTimeToSeconds = (lyricTime: string) => {
  const [minAndSec, milliseconds] = lyricTime.split('.');
  const [minutes, seconds] = minAndSec.split(':').map((time) => parseInt(time, 10));
  return minutes * 60 + seconds + parseInt(milliseconds, 10) / 100;
};

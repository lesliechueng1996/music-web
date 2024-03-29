'use client';

import { cn } from '@/lib/utils';
import { useBoolean } from 'usehooks-ts';
import { ArrowBigRightDash } from 'lucide-react';
import { findLyricIndex, lyricTimeToSeconds } from '@/lib/duration';
import { MouseEventHandler, useEffect, useRef } from 'react';

type Props = {
  lyrics: {
    time: string;
    text: string;
  }[];
  currentTime: number;
  onStartScroll?: () => void;
  onSwitchLyric?: (index: number, time: number) => void;
};

const LINE_HEIGHT = 24;

const ScrollLyric = ({ lyrics, currentTime, onStartScroll, onSwitchLyric }: Props) => {
  const { value: isOnScroll, setTrue: startScroll, setFalse: endScroll } = useBoolean(false);
  const lyricRef = useRef<HTMLDivElement>(null);
  const currentMouseY = useRef(0);
  const currentLyricIndex = useRef(0);
  const latestTargetIndex = useRef(0);
  const lyricIndex = findLyricIndex(lyrics, currentTime);

  useEffect(() => {
    if (lyricRef.current) {
      const moveHeight = lyricIndex * LINE_HEIGHT + LINE_HEIGHT / 2;
      lyricRef.current.style.transform = `translateY(-${moveHeight}px)`;

      currentLyricIndex.current = lyricIndex;
    }
  }, [lyricIndex]);

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!lyricRef.current) {
      return;
    }
    startScroll();
    currentMouseY.current = e.clientY;
    onStartScroll?.();
  };

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = () => {
    if (!isOnScroll) {
      return;
    }
    currentLyricIndex.current = latestTargetIndex.current;
    endScroll();
    onSwitchLyric?.(currentLyricIndex.current, lyricTimeToSeconds(lyrics[currentLyricIndex.current].time));
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isOnScroll || !lyricRef.current) {
      return;
    }
    const moveHeight = e.clientY - currentMouseY.current;
    const moveIndex = -1 * Math.round(moveHeight / LINE_HEIGHT);
    const targetIndex = Math.min(lyrics.length - 1, Math.max(0, currentLyricIndex.current + moveIndex));
    latestTargetIndex.current = targetIndex;
    const newMoveHeight = targetIndex * LINE_HEIGHT + LINE_HEIGHT / 2;
    lyricRef.current.style.transform = `translateY(-${newMoveHeight}px)`;
  };

  return (
    <div className="h-full bg-muted py-3 relative overflow-hidden">
      <div
        className={cn(
          'flex items-center gap-1 absolute left-1 right-1 top-1/2 -translate-y-1/2',
          isOnScroll ? 'opacity-50' : 'opacity-0'
        )}
      >
        <div>
          <ArrowBigRightDash />
        </div>
        <div className="h-[2px] w-full bg-primary"></div>
      </div>
      <div
        ref={lyricRef}
        className={cn(
          'absolute top-1/2 left-8 right-8 transition-transform duration-100',
          isOnScroll ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {lyrics.map(({ time, text }) => (
          <div key={time} className={cn('relative text-center', `h-[${LINE_HEIGHT}px]`)}>
            <span className={cn('absolute left-0 top-0 text-foreground/50', isOnScroll ? 'opacity-1' : 'opacity-0')}>
              {time}
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollLyric;

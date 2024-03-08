'use client';

import { Button } from '@/components/ui/button';
import useLyric from '@/hooks/useLyric';
import { XCircle } from 'lucide-react';

const LyricLineList = () => {
  const { lyricLines, removeLyricLine } = useLyric();

  if (lyricLines.length === 0) {
    return <div>暂无歌词</div>;
  }

  return (
    <div className="space-y-3">
      {lyricLines.map((line) => (
        <div className="px-3 py-2 bg-secondary rounded-md flex items-center" key={line.id}>
          <Button variant="ghost" onClick={() => removeLyricLine(line.id)}>
            <XCircle size={24} />
          </Button>
          <div className="border-2 border-primary p-1 rounded-md">{line.time}</div>
          <div className="pl-5">{line.text}</div>
        </div>
      ))}
    </div>
  );
};

export default LyricLineList;

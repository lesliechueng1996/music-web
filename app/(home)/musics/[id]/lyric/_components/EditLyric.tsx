'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useLyric from '@/hooks/useLyric';
import { isValidLyricTime } from '@/lib/duration';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const EditLyric = () => {
  const { lyricLines, putLyricLines } = useLyric();
  const plainText = lyricLines.map((line) => `[${line.time}]${line.text}`).join('\n');

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const text = formData.get('lyric') as string;
    const lines = text.split('\n').map((line) => {
      const [time, ...text] = line.split(']');
      return {
        time: time.slice(1),
        text: text.join(''),
      };
    });
    for (const line of lines) {
      if (!isValidLyricTime(line.time)) {
        toast.error('歌词时间格式错误');
        return;
      }
    }
    putLyricLines(lines);
  };

  return (
    <form className="h-full flex flex-col gap-3" onSubmit={handleFormSubmit}>
      <Textarea defaultValue={plainText} className="grow resize-none" name="lyric" />
      <div className="text-right">
        <Button type="submit">暂存</Button>
      </div>
    </form>
  );
};

export default EditLyric;

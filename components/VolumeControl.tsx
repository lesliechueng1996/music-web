'use client';

import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { Slider } from './ui/slider';

type Props = {
  defaultVolume?: number;
  onVolumeChange: (volume: number) => void;
};

const VolumeControl = ({ defaultVolume = 50, onVolumeChange }: Props) => {
  const [volume, setVolume] = useState(defaultVolume);

  const setVolumeAndNotify = (volume: number) => {
    setVolume(volume);
    onVolumeChange(volume);
  };

  const toggleVolume = () => {
    if (volume === 0) {
      setVolumeAndNotify(defaultVolume);
    } else {
      setVolumeAndNotify(0);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={toggleVolume}>
        {volume === 0 ? <VolumeX size={32} /> : volume < 50 ? <Volume1 size={32} /> : <Volume2 size={32} />}
      </button>
      <Slider
        className="w-36"
        min={0}
        max={100}
        value={[volume]}
        step={1}
        onValueChange={(values) => setVolumeAndNotify(values[0])}
      />
    </div>
  );
};

export default VolumeControl;

'use client';

import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { Slider } from './ui/slider';
import { Button } from './ui/button';

type Props = {
  defaultVolume?: number;
  onVolumeChange: (volumePercent: number) => void;
  disabled?: boolean;
};

const VolumeControl = ({ defaultVolume = 50, onVolumeChange, disabled = false }: Props) => {
  const [volume, setVolume] = useState(defaultVolume);

  const setVolumeAndNotify = (volume: number) => {
    setVolume(volume);
    onVolumeChange(volume / 100);
  };

  const toggleVolume = () => {
    if (volume === 0) {
      setVolumeAndNotify(defaultVolume);
    } else {
      setVolumeAndNotify(0);
    }
  };

  return (
    <div className="flex items-center">
      <Button onClick={toggleVolume} variant="ghost" disabled={disabled}>
        {volume === 0 ? <VolumeX size={32} /> : volume < 50 ? <Volume1 size={32} /> : <Volume2 size={32} />}
      </Button>
      <Slider
        className="w-36"
        min={0}
        max={100}
        value={[volume]}
        step={1}
        disabled={disabled}
        onValueChange={(values) => setVolumeAndNotify(values[0])}
      />
    </div>
  );
};

export default VolumeControl;

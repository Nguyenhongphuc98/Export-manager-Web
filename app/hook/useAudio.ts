
'use-client'

import { useEffect, useRef } from 'react';

const useAudioPlayer = (audioSrc: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize the audio element when the component mounts
  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.muted = true;
    audioRef.current.preload = 'auto';

    return () => {
      // Clean up: Destroy audio element when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  // Function to play the audio
  const play = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e =>{
        console.log('plau audio fail', e);
      });
    }
  };

  // Function to pause the audio
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Function to stop the audio (pause and reset current time)
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, pause, stop };
};

export default useAudioPlayer;

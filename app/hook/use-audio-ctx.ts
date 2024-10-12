
'use-client'

import { useEffect, useRef } from 'react';
// import { MyAudio } from '../core/audio';

const useAudioCtxPlayer = () => {
  const audioRef = useRef<any>(null);

  // Initialize the audio element when the component mounts
  useEffect(() => {
    import('../core/audio').then(({ MyAudio }) => {
        audioRef.current = new MyAudio('/phone.mp3');

        return () => {
          if (audioRef.current) {
            audioRef.current = null;
          }
        };
    });
    
  }, []);

  const play = () => {
    audioRef.current?.play();
}

  return { play };
};

export default useAudioCtxPlayer;

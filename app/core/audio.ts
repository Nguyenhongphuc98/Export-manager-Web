'use client'

export class MyAudio {
    private static audioContext = new AudioContext();
    private static source: AudioBufferSourceNode | null = null;
    private static audioBuffer: AudioBuffer | null = null;

    private static muted: boolean = true;

    constructor(private readonly path: string) {
        this.init();
    }

    async init() {
       try {
        const response = await fetch(this.path);
        const arrayBuffer = await response.arrayBuffer();
        
        // Decode the audio file data into an AudioBuffer
        MyAudio.audioBuffer = await MyAudio.audioContext.decodeAudioData(arrayBuffer);
        
       } catch (error) {
        console.log('init audio got error');
       }
    }

    unmute() {
        MyAudio.muted = false;
        this.play();
    }

    mute() {
        MyAudio.muted = true;
    }

    async play() {
        if (MyAudio.muted == true) {
            return;
        }

        try {
            
            // Create a buffer source
            MyAudio.source = MyAudio.audioContext.createBufferSource();
            MyAudio.source.buffer = MyAudio.audioBuffer;
            MyAudio.source?.start();
            MyAudio.source?.connect(MyAudio.audioContext.destination);
            
            
           } catch (error) {
            console.log('init audio got error');
           }
    }
}

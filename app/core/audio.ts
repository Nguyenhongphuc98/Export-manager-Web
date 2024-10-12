'use client'

class MyAudio {
    private audioContext = new AudioContext();
    private source: AudioBufferSourceNode | null = null;
    private audioBuffer: AudioBuffer | null = null;

    constructor(private readonly path: string) {
        this.init();
    }

    async init() {
       try {
        const response = await fetch(this.path);
        const arrayBuffer = await response.arrayBuffer();
        
        // Decode the audio file data into an AudioBuffer
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        
       } catch (error) {
        console.log('init audio got error');
       }
    }

    async play() {

        // this.source.
        
        // // Connect the source to the audio context's destination (speakers)
        // this.source?.connect(this.audioContext.destination);

        // setTimeout(() => {
        //     this.source?.disconnect(this.audioContext.destination);
        // }, 300);

        try {
            
            // Create a buffer source
            this.source = this.audioContext.createBufferSource();
            this.source.buffer = this.audioBuffer;
            this.source?.start();
            this.source?.connect(this.audioContext.destination);
            
            
           } catch (error) {
            console.log('init audio got error');
           }
    }
}

export const PipAudio = new MyAudio('/phone.mp3');

'use client'

export class MyAudio {
    private static audioContext = new AudioContext();
    private static source: AudioBufferSourceNode | null = null;
    private static audioBuffer: AudioBuffer | null = null;

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

    async play() {

        // this.source.
        
        // // Connect the source to the audio context's destination (speakers)
        // this.source?.connect(this.audioContext.destination);

        // setTimeout(() => {
        //     this.source?.disconnect(this.audioContext.destination);
        // }, 300);

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


class RTMSynthesis {
    private synth?: SpeechSynthesis;
    utterance: SpeechSynthesisUtterance = {} as SpeechSynthesisUtterance;
    voices: SpeechSynthesisVoice[] = [];
    activeVoice?: SpeechSynthesisVoice;

    constructor() {
        if (!('speechSynthesis' in window)) {
            return;
        }

        this.synth = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();

        this.handleEvents();
    }
    

    get available(): boolean {
        return !!this.synth;
    }

    readText = (text: string, onUtteranceEvent: (...args: any[]) => any) => {
        if (!this.synth) {
            return;
        }
        this.utterance.rate = 2; 
        this.utterance.text = text;

        const removeEvent = () => {
            onUtteranceEvent({type: 'stop'});
            this.utterance.removeEventListener('boundary', onUtteranceEvent);
            this.utterance.removeEventListener('end', removeEvent);
            this.utterance.removeEventListener('error', removeEvent);
        };
        
        this.utterance.addEventListener('boundary', onUtteranceEvent);
        this.utterance.addEventListener('end', removeEvent);
        this.utterance.addEventListener('error', removeEvent);
        this.synth.speak(this.utterance);
    }

    stopReading = () => {
        this.synth?.cancel();
    }

    handleEvents = () => {
        if (!this.synth) {
            return;
        }
        this.synth.addEventListener('voiceschanged', () => {
            this.voices = this.synth?.getVoices() || [];
            if (!this.voices) {
                return;
            }
            this.activeVoice = this.voices.find(voice => voice.default) || this.voices[0];
        });

        // this.utterance.onend = this.removeBoundaryEvent;
        // this.utterance.onerror = this.removeBoundaryEvent;
        // this.utterance.onstart = () => console.log('start');
        // this.utterance.onpause = () => console.log('pause');
        // this.utterance.onresume = () => console.log('resume');
    }

    removeBoundaryEvent = (event: Event) => {
        console.log(event.type);
        
        this.utterance.onboundary = null;
    }
}


const SynthesisService = new RTMSynthesis();
export default SynthesisService;

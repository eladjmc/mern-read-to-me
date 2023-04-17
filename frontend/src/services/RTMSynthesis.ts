
class RTMSynthesis {
    readonly MIN_RATE = 0.1;
    private synth?: SpeechSynthesis;
    utterance: SpeechSynthesisUtterance = {} as SpeechSynthesisUtterance;
    private utteranceActive = false;
    private _voices: SpeechSynthesisVoice[] = [];

    constructor() {
        if (!('speechSynthesis' in window)) {
            return;
        }

        this.synth = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();
        this.setUtteranceRate(1);

        this.initVoices();
    }

    set activeVoice(activeVoice: SpeechSynthesisVoice | null) {
        this.utterance.voice = activeVoice;
    }

    get activeVoice(): SpeechSynthesisVoice | null {
        return this.utterance.voice;
    }

    get available(): boolean {
        return !!this.synth;
    }

    get voices(): SpeechSynthesisVoice[] {
        return this._voices;
    }



    setUtteranceVolume = (volume: number) => {
        this.utterance.volume = volume;
    }
    

    getUtteranceRate = () => {
        console.log(this.utterance.rate);
        
        return this.utterance.rate;
    }

    setUtteranceRate = (rate: number) => {        
        this.utterance.rate = Math.max(this.MIN_RATE, rate);
        console.log(this.utterance.rate);
        
    }

    readText = (text: string, onUtteranceEvent: (event: Event, ...args: any[]) => any) => {
        if (!this.synth) {
            return;
        }

        this.utterance.text = text;

        const removeEvent = (event: Event) => {
            onUtteranceEvent(event);
            this.utterance.addEventListener('start', onUtteranceEvent);
            this.utterance.addEventListener('pause', onUtteranceEvent);
            this.utterance.addEventListener('resume', onUtteranceEvent);
            this.utterance.removeEventListener('boundary', onUtteranceEvent);
            this.utterance.removeEventListener('end', removeEvent);
            this.utterance.removeEventListener('error', removeEvent);
            this.utteranceActive = false;
        };

        this.utterance.addEventListener('start', onUtteranceEvent);
        this.utterance.addEventListener('pause', onUtteranceEvent);
        this.utterance.addEventListener('resume', onUtteranceEvent);
        this.utterance.addEventListener('boundary', onUtteranceEvent);
        this.utterance.addEventListener('end', removeEvent);
        this.utterance.addEventListener('error', removeEvent);
        this.synth.speak(this.utterance);
        this.utteranceActive = true;
    }

    get isUtteranceActive(): boolean {
        return this.utteranceActive;
    }

    stopReading = () => {
        this.synth?.cancel();
    }

    initVoices = () => {
        if (!this.synth) {
            return;
        }
        this.synth.addEventListener('voiceschanged', () => {
            this._voices = this.synth?.getVoices() || [];
            if (!this._voices) {
                return;
            }
            this.activeVoice = this._voices.find(voice => voice.default) || null;
        });
    }


    removeBoundaryEvent = (event: Event) => {
        console.log(event.type);

        this.utterance.onboundary = null;
    }
}


const SynthesisService = new RTMSynthesis();
export default SynthesisService;

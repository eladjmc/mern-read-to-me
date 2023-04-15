
class RTMSynthesis {
    private synth?: SpeechSynthesis;
    utterance: SpeechSynthesisUtterance = {} as SpeechSynthesisUtterance;
    private utteranceActive = false;
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

    setUtteranceVolume = (volume: number) => {
        this.utterance.volume = volume;
    }

    readText = (text: string, onUtteranceEvent: (event: Event, ...args: any[]) => any) => {
        if (!this.synth) {
            return;
        }

        this.utterance.rate = 2;
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

        // this.utterance.onend = (e) => {
        //     console.log(e);

        // };
        // this.utterance.onerror = (e) => {
        //     console.log(e);

        // };
    }

    removeBoundaryEvent = (event: Event) => {
        console.log(event.type);

        this.utterance.onboundary = null;
    }
}


const SynthesisService = new RTMSynthesis();
export default SynthesisService;

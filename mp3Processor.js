class AudioProcessor {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.sourceNode = null;
        this.gainNode = this.audioContext.createGain();
        this.analyser = this.audioContext.createAnalyser();

        // Equalizer Filters
        this.lowFilter = this.audioContext.createBiquadFilter();
        this.lowFilter.type = "lowshelf";

        this.middleFilter = this.audioContext.createBiquadFilter();
        this.middleFilter.type = "peaking";

        this.highFilter = this.audioContext.createBiquadFilter();
        this.highFilter.type = "highshelf";

        // Voice separation (example: reduce non-voice frequencies)
        this.voiceFilter = this.audioContext.createBiquadFilter();
        this.voiceFilter.type = "bandpass";
        this.voiceFilter.frequency.value = 1000;

        // Connecting filters
        this.lowFilter.connect(this.middleFilter);
        this.middleFilter.connect(this.highFilter);
        this.highFilter.connect(this.voiceFilter);
        this.voiceFilter.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
    }

    loadAudio(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.audioContext.decodeAudioData(e.target.result, (buffer) => {
                if (this.sourceNode) {
                    this.sourceNode.disconnect();
                }
                this.sourceNode = this.audioContext.createBufferSource();
                this.sourceNode.buffer = buffer;
                this.sourceNode.connect(this.lowFilter);
                this.sourceNode.start();
            });
        };
        reader.readAsArrayBuffer(file);
    }

    setFader(value) {
        this.gainNode.gain.value = value;
    }

    setLowGain(value) {
        this.lowFilter.gain.value = value;
    }

    setMiddleGain(value) {
        this.middleFilter.gain.value = value;
    }

    setHighGain(value) {
        this.highFilter.gain.value = value;
    }

    setVoiceSeparation(value) {
        this.voiceFilter.Q.value = value;
    }

    stopAudio() {
        if (this.sourceNode) {
            this.sourceNode.stop();
        }
    }
}
var page = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Processor</title>
</head>
<body>
    <h1>MP3 Audio Processor</h1>
    <input type="file" id="audioFile" accept="audio/mp3">
    <div>
        <label>Fader: </label>
        <input type="range" id="fader" min="0" max="2" step="0.1" value="1">
    </div>
    <div>
        <label>Low Gain: </label>
        <input type="range" id="lowGain" min="-30" max="30" step="1" value="0">
    </div>
    <div>
        <label>Middle Gain: </label>
        <input type="range" id="middleGain" min="-30" max="30" step="1" value="0">
    </div>
    <div>
        <label>High Gain: </label>
        <input type="range" id="highGain" min="-30" max="30" step="1" value="0">
    </div>
    <div>
        <label>Voice Separation: </label>
        <input type="range" id="voiceSep" min="0" max="10" step="0.1" value="1">
    </div>
    <button id="stopAudio">Stop</button>

    <script>
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const processor = new AudioProcessor(audioContext);

        document.getElementById("audioFile").addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                processor.loadAudio(file);
            }
        });

        document.getElementById("fader").addEventListener("input", (event) => {
            processor.setFader(event.target.value);
        });

        document.getElementById("lowGain").addEventListener("input", (event) => {
            processor.setLowGain(event.target.value);
        });

        document.getElementById("middleGain").addEventListener("input", (event) => {
            processor.setMiddleGain(event.target.value);
        });

        document.getElementById("highGain").addEventListener("input", (event) => {
            processor.setHighGain(event.target.value);
        });

        document.getElementById("voiceSep").addEventListener("input", (event) => {
            processor.setVoiceSeparation(event.target.value);
        });

        document.getElementById("stopAudio").addEventListener("click", () => {
            processor.stopAudio();
        });
    </script>
</body>
</html>
`
// Register SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
}

const SETTINGS = (function appSettings() {
    let settings = {
        "bpm": 120
    }

    return {
        settings
    }
})();

const CALC = (function calculator() {
    let calcType = "";

    const midiNotes = generateMidiNotes();

    const calculations = {
        "bs": (bars) => {
            const bpm = SETTINGS.settings.bpm;

            const value = Math.ceil((bars * 4) / (bpm / 60) * 1000);

            return {
                value: value < 1000 ? value : (value/1000).toFixed(2),
                label: value < 1000 ? 'ms' : 'sec'
            };
        },
        "bh": (bars) => {
            const bpm = SETTINGS.settings.bpm;

            const value = 1 / (Math.ceil((bars * 4) / (bpm / 60) * 1000) / 1000);

            return {
                value: value.toFixed(2),
                label: "hz"
            };
        },
        "nh": (midiNote) => {
            const stdPitch = 440;

            const midiNoteValue = midiNotes[midiNote];

            return stdPitch * Math.pow(((midiNoteValue - 69) / 12), 2);
        }
    };

    return {
        calc
    }

    function calc(calcType, input) {
        return calculations[calcType](input);
    }

    function generateMidiNotes() {
        const notes = [
            ["A", 0],
            ["A#", 1],
            ["B", 2],
            ["C", 3],
            ["C#", 4],
            ["D", 5],
            ["D#", 6],
            ["E", 7],
            ["F", 8],
            ["F#", 9],
            ["G", 10],
            ["G#", 11]
        ];

        let octaves = [...Array(10).keys()];

        let midiNotes = {};

        octaves.forEach((octave) => {
            notes.forEach((note) => {
                const noteName = note[0];
                const delta = note[1];

                let noteOctave = octave;

                if(noteName === 'C') {
                    noteOctave += 1;
                }

                let octaveOffset = null;

                if(["A", "A#", "B"].includes(noteName)) {
                    octaveOffset =
                        notes.length * noteOctave;
                } else {
                    octaveOffset =
                        notes.length * (noteOctave == 0 ? 0 : noteOctave - 1);
                }

                const noteNumber = 21 + delta + octaveOffset;

                midiNotes[noteName + String(noteOctave)] = noteNumber;
            });
        });

        return midiNotes;
    }
})();

const UI = (function userInterface() {
    const colors = {
        "bs": "var(--color-red)",
        "bh": "var(--color-blue)",
        "nh": "var(--color-green)"
    }

    const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

    return {
        update
    }

    function update() {
        const calcType = getCalcType();
        const inputValue = getInputValue();

        if(calcType != 'nh') {
            // Update output
            const result = CALC.calc(calcType, inputValue);

            setOutputValue(result.value);
            setOutputLabel(result.label);
        } else {
            // Generate Note Diagram
            generateNoteDiagram();
        }

        updatePrimaryColor();
    }

    function generateNoteDiagram() {
        console.log(notes.map((note) => {
            const noteHz =CALC.calc('nh', note + getInputValue())
            return ;
        }));
    }

    function updatePrimaryColor() {
        document.querySelector('main').style.setProperty(
            '--color-primary',
            colors[getCalcType()]
        );
    }

    function getCalcType() {
        return document.querySelector('.calc-type.active').dataset.calc;
    }

    function getInputValue() {
        return document.querySelector('.input .value').value;
    }

    function setOutputValue(value) {
        document.querySelector('.output .value').textContent = value;
    }

    function setOutputLabel(label) {
        document.querySelector('.output .label').textContent = label;
    }
})();

(function initEvents() {
    const inputEl = document.querySelector('.input');

    inputEl.addEventListener('change', (e) => {
        UI.update();
    });

    const calcTypeEls = document.querySelectorAll('.calc-type');

    calcTypeEls.forEach((el) => {
        el.addEventListener('click', (e) => {
            calcTypeEls.forEach((el) => {
                el.classList.remove('active');
            })

            e.target.classList.add('active');

            UI.update();
        });
    });
})();

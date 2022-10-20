// Register SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("serviceworker.js");
}

const CALC = (function calculator() {
    let calcType = "";

    const calculations = {
        "bs": (input) => {
            return input;
        },
        "bh": (input) => {
            return input;
        },
        "nh": (input) => {
            return input;
        }
    };

    return {
        calc
    }

    function calc(calcType, input) {
        return calculations[calcType](input);
    }
})();

const UI = (function userInterface() {
    let state = {
        iValue: getDefaultInitValue(),
        iLabel: getDefaultInitLabel(),
        oValue: undefined,
        oLabel: "ms"
    };

    return {
        getCalcType,
        state,
        update
    }

    function update() {

    }

    function getCalcType() {
        return document.querySelector('.calc-type.active').dataset.calc ?? "";
    }

    function getInitInputValue() {
        return document.querySelector('.input').value;
    }

    function getInitInputLabel() {
        return document.querySelector('.split-container__top .unit-label').textContent;
    }
})();

(function initEvents() {
    const inputEl = document.querySelector('.input');

    inputEl.addEventListener('change', (e) => {
        // Get Active Calculation Type
        // Calculate Output Value
        // Calculate Output Label
    });
})();

const CLASS_LIST = {
    all: "inp",
    siteCalc: "site-calc-inp",
    deposit: "deposit-inp",
    credit: "credit-inp",
    periodMonthly: "period-monthly-inp",
    percent: "percent-inp",
    fee: "fee-inp",
}

const INPUTS = {
    all: document.querySelectorAll(`.${CLASS_LIST.all}`),
}

const VALID_INTERVALS = {
    siteCalc: {
        min: 0.01,
        max: 999999,
    },
    deposit: {
        min: 1000,
        max: 99999999,
    },
    credit: {
        min: 10000,
        max: 99999999,
    },
    periodMonthly: {
        min: 1,
        max: 120,
    },
    percent: {
        min: 0.0001,
        max: 40,
    },
    fee: {
        min: 0,
        max: 1000,
    },
};

const TEXT_ERRORS = {
    emptyInp: () => {
        return "Поле не може бути пустим";
    },
    minValue: (num) => {
        return `Мінімальне значення: ${num}`;
    },
    maxValue: (num) => {
        return `Максимальне значення: ${num}`;
    },
}


// * FUNCTIONS

function checkInp(inp, intervalMin, intervalMax) {
    let inpValue = inp.value;
    if (inpValue === "") {
        setErrorFor(inp, TEXT_ERRORS.emptyInp());
    } else if (+inpValue < intervalMin) {
        setErrorFor(inp, TEXT_ERRORS.minValue(intervalMin));
    } else if (+inpValue > intervalMax) {
        setErrorFor(inp, TEXT_ERRORS.maxValue(intervalMax));
    } else {
        setSuccessFor(inp);
    }
}

// * Ограничение количества чисел после комы
function setDecimalNumber(inp) {
    // цифра устанавливает количество цифр после запятой, т.е. если 3, то максимум 2 цифры после запятой
    let num = 3;
    if (inp.value.indexOf(".") != '-1') {
        inp.value = inp.value.substring(0, inp.value.indexOf(".") + num);
    }
}

function setErrorFor(inp, message) {
    const formControl = inp.parentElement;
    const small = formControl.querySelector("small");

    formControl.classList.add("_error")
    formControl.classList.remove("_success");
    small.textContent = message;
}

function setSuccessFor(inp) {
    const formControl = inp.parentElement;

    formControl.classList.remove("_error")
    formControl.classList.add("_success");
}


// * CALL FUNCTIONS

for (const inp of INPUTS.all) {
    inp.addEventListener("input", function () {
        setDecimalNumber(this);
    });
    inp.addEventListener("change", function(e) {
        let target = e.target;
        if (target.classList.contains(CLASS_LIST.siteCalc)) {
            checkInp(this, VALID_INTERVALS.siteCalc.min, VALID_INTERVALS.siteCalc.max);

        } else if (target.classList.contains(CLASS_LIST.deposit)) {
            checkInp(this, VALID_INTERVALS.deposit.min, VALID_INTERVALS.deposit.max);

        } else if (target.classList.contains(CLASS_LIST.credit)) {
            checkInp(this, VALID_INTERVALS.credit.min, VALID_INTERVALS.credit.max);

        } else if (target.classList.contains(CLASS_LIST.periodMonthly)) {
            checkInp(this, VALID_INTERVALS.periodMonthly.min, VALID_INTERVALS.periodMonthly.max);

        } else if (target.classList.contains(CLASS_LIST.percent)) {
            checkInp(this, VALID_INTERVALS.percent.min, VALID_INTERVALS.percent.max);

        } else if (target.classList.contains(CLASS_LIST.fee)) {
            checkInp(this, VALID_INTERVALS.fee.min, VALID_INTERVALS.fee.max);
        }
    });
}

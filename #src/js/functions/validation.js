const inputs = {
    all: document.querySelectorAll(".inp"),
    siteCalc: document.querySelectorAll(".site-calc-inp"),
    deposit: document.querySelectorAll(".deposit-inp"),
    credit: document.querySelectorAll(".credit-inp"),
    periodMonth: document.querySelectorAll(".period-month-inp"),
    percent: document.querySelectorAll(".percent-inp"),
    fee: document.querySelectorAll(".fee-inp"),
}

const validIntervals = {
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
    periodMonth: {
        min: 1,
        max: 120,
    },
    percent: {
        min: 0.0001,
        max: 40,
    },
    fee: {
        min: 0,
        max: 5000,
    },
};

const textErrors = {
    emptyInp: function () {
        return "Поле не може бути пустим";
    },
    minValue: function (num) {
        return `Мінімальне значення: ${num}`;
    },
    maxValue: function (num) {
        return `Максимальне значення: ${num}`;
    },
}


// * FUNCTIONS

function checkInp(inp, intervalMin, intervalMax) {
    let inpValue = inp.value;
    if (inpValue === "") {
        setErrorFor(inp, textErrors.emptyInp());
    } else if (+inpValue < intervalMin) {
        setErrorFor(inp, textErrors.minValue(intervalMin));
    } else if (+inpValue > intervalMax) {
        setErrorFor(inp, textErrors.maxValue(intervalMax));
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

for (let item of inputs.all) {
    item.addEventListener("input", function () {
        setDecimalNumber(item);
    });
}
for (let item of inputs.siteCalc) {
    item.addEventListener("change", function () {
        checkInp(item, validIntervals.siteCalc.min, validIntervals.siteCalc.max);
    });
}
for (let item of inputs.deposit) {
    item.addEventListener("change", function () {
        checkInp(item, validIntervals.deposit.min, validIntervals.deposit.max);
    });
}
for (let item of inputs.credit) {
    item.addEventListener("change", function () {
        checkInp(item, validIntervals.credit.min, validIntervals.credit.max);
    });
}
for (let item of inputs.periodMonth) {
    item.addEventListener("change", function () {
        checkInp(item, validIntervals.periodMonth.min, validIntervals.periodMonth.max);
    });
}
for (let item of inputs.percent) {
    item.addEventListener("change", function () {
        checkInp(item, validIntervals.percent.min, validIntervals.percent.max);
    });
}
for (let item of inputs.fee) {
    item.addEventListener("change", function () {
        checkInp(item, validIntervals.fee.min, validIntervals.fee.max);
    });
}


// Попытка вынести вызов в отдельную f(x)

// function addInpListener(inpList, eventType, ...intervalValues) {
//     let inpArr = Array.from(inpList);

//     for (let item of inpArr) {
//         if (intervalValues.length == 0) {
//             item.addEventListener(eventType, setDecimalNumber(item));
//             break;

//         } else if (intervalValues.length == 2) {
//             let [intervalMin, intervalMax] = [intervalValues[1], intervalValues[2]];
//             item.addEventListener(eventType, checkInp(item, intervalMin, intervalMax));
//             break;

//         } else {
//             console.log("Count of arguments (intervalValues :91, validation.js) 0 or 2", intervalValues);
//         }
//     }
// }

//         addInpListener(
//             inputs.all,
//             "input",
//         );
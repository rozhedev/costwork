
import {OUTPUT_FUNC} from "../functions/output";
import {createPaymentTable} from "../functions/table-gen";

// * sim (simple) - Deposit without capitalisation, cap - Deposit with capitalisation

const INPUTS = {
    sim: {
        all: document.querySelectorAll(".sim-deposit-inp"),
        amount: document.getElementById("sim-deposit-amount"),
        yearRate: document.getElementById("sim-year-rate"),
        period: document.getElementById("sim-deposit-period"),
    },
    cap: {
        all: document.querySelectorAll(".cap-deposit-inp"),
        amount: document.getElementById("cap-deposit-amount"),
        yearRate: document.getElementById("cap-year-rate"),
        period: document.getElementById("cap-deposit-period"),
    }
}

const OUTPUTS = {
    sim: {
        total: document.getElementById("deposit-total-output"),
        profit: document.getElementById("deposit-profit-output"),
        monthProfit: document.getElementById("deposit-month-profit-output"),
        fee: document.getElementById("deposit-pdv-profit-output"),
    },
    cap: {
        table: document.querySelector("#deposit-table-output tbody"),
        screenTip: document.querySelector(".message-tip"),
    }
}

let delay = 1000;
let pdvFee = 19.5;
let screenTipNum = 536;

const TABLE_ITEM_TITLES = {
    month: "місяць:",
    totalProfit: "Загальний дохід:",
    feeProfit: `З урах. податків (${pdvFee}%):`,
};


// * CALC SIMPLE PERCENT

function calcSimProfit(amount, rate, period) {
    let dayPeriod = period * 30;
    return +((amount * rate * dayPeriod / 365) / 100).toFixed(2);
}

// * SIMPLE PERCENT OUTPUT

if (INPUTS.sim.all && INPUTS.sim.amount && INPUTS.sim.yearRate && INPUTS.sim.period) {
    let inpArr = [...INPUTS.sim.all];

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of inpArr) {
        inpItem.addEventListener("change", function () {
            // * Condition which check _success class in all form controllers
            let formControllerCond = inpArr.every((item) => item.parentElement.classList.contains("_success"));

            if (formControllerCond) {
                const values = {
                    amount: +INPUTS.sim.amount.value,
                    yearRate: +INPUTS.sim.yearRate.value,
                    period: +INPUTS.sim.period.value,
                }
                let resultObj = {
                    // * Net profit - чистый доход
                    netProfit: calcSimProfit(values.amount, values.yearRate, values.period),
                    get totalProfit() {
                        return +(this.netProfit + values.amount).toFixed(2);
                    },
                    get monthProfit() {
                        return +(this.netProfit / values.period).toFixed(2);
                    },
                    get pdvProfit() {
                        return `(податок = ${pdvFee}%) ${+(this.netProfit - (this.netProfit * (pdvFee / 100))).toFixed(2)}`;
                    },
                }

                setTimeout(function () {
                    OUTPUT_FUNC.outputResult(resultObj, OUTPUTS.sim);
                }, delay);
            }
        });
    }
}


// * CALC CAPITALISATION PERCENT

function calcCapProfit(amount, rate, period) {
    let monthlyProfitObj = {
        amount: [],
        profit: [],
    };
    let dayPeriod = period * 30;
    let startAmount = amount;

    for (let i = 1; i <= period; i++) {
        let yearRate = rate / 100;
        let monthlyPercent = amount * ((1 + yearRate / 365) ** dayPeriod);
        amount += (monthlyPercent - amount);

        monthlyProfitObj.profit[i] = +(monthlyPercent / dayPeriod).toFixed(2);
    }

    for (let i = 1; i <= period; i++) {
        let temp = monthlyProfitObj.profit[i];
        if (i == 1) {
            monthlyProfitObj.amount[i] = +(temp + startAmount).toFixed(2);
        } else {
            monthlyProfitObj.amount[i] = temp + monthlyProfitObj.amount[i - 1];
            monthlyProfitObj.amount[i] = +(monthlyProfitObj.amount[i]).toFixed(2);
        }
    }

    return monthlyProfitObj;
}

// * CAPITALISATION TOTAL SUMMA

function calcCapProfitSum(arr1, arr2, amount, pdv) {
    let profitSumObj = {
        monthlyProfit: 0,
        monthlyProfitPdv: 0,
        monthlyAmount: 0,
        monthlyAmountPdv: 0,
    }
    for (let i = 1; i < arr2.length; i++) {
        profitSumObj.monthlyProfit += arr2[i];
    }
    profitSumObj.monthlyProfit = +(profitSumObj.monthlyProfit).toFixed(2);
    profitSumObj.monthlyProfitPdv = +(profitSumObj.monthlyProfit - profitSumObj.monthlyProfit * (pdv / 100)).toFixed(2);

    profitSumObj.monthlyAmount = arr1.at(-1);
    profitSumObj.monthlyAmountPdv = amount + profitSumObj.monthlyProfitPdv;

    return profitSumObj;
}

// * CAPITALISATION PERCENT OUTPUT

if (INPUTS.cap.all && INPUTS.cap.amount && INPUTS.cap.yearRate && INPUTS.cap.period) {
    let inpArr = [...INPUTS.cap.all];
    OUTPUT_FUNC.checkScreenWidth(OUTPUTS.cap.screenTip, screenTipNum);

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of inpArr) {
        inpItem.addEventListener("change", function () {
            // * Condition which check _success class in all form controllers
            let formControllerCond = inpArr.every((item) => item.parentElement.classList.contains("_success"));

            if (formControllerCond) {
                const values = {
                    amount: +INPUTS.cap.amount.value,
                    yearRate: +INPUTS.cap.yearRate.value,
                    period: +INPUTS.cap.period.value,
                }
                // * RESULT OBJECTS
                let monthlyProfitObj = calcCapProfit(values.amount, values.yearRate, values.period);
                let totalProfitObj = calcCapProfitSum(monthlyProfitObj.amount, monthlyProfitObj.profit, values.amount, pdvFee);
                let totalProfitArr = Object.entries(totalProfitObj);

                setTimeout(function () {
                    OUTPUTS.cap.table.innerHTML = "";

                    createPaymentTable(OUTPUTS.cap.table, TABLE_ITEM_TITLES.month, monthlyProfitObj.amount, monthlyProfitObj.profit);
                    createPaymentTable(OUTPUTS.cap.table, TABLE_ITEM_TITLES.totalProfit, totalProfitArr[2], totalProfitArr[0]);
                    createPaymentTable(OUTPUTS.cap.table, TABLE_ITEM_TITLES.feeProfit, totalProfitArr[3], totalProfitArr[1]);
                }, delay);
            }
        });
    }
}

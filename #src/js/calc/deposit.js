import { COMMON_VALUES, TABLE_LABELS } from "../common/values";
import { COMMON_COND } from "../common/conditions";
import { outputResult, checkScreenWidth } from "../common/output";
import { createPaymentTable } from "../common/table-gen";

// * sim (simple) - Deposit without capitalisation, cap - Deposit with capitalisation

const DEP_INPUTS = {
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

const DEP_OUTPUTS = {
    sim: {
        total: document.getElementById("deposit-total-output"),
        profit: document.getElementById("deposit-profit-output"),
        monthlyProfit: document.getElementById("deposit-monthly-profit-output"),
        fee: document.getElementById("deposit-pdv-profit-output"),
    },
    cap: {
        table: document.querySelector("#deposit-table-output tbody"),
        screenTip: document.querySelector(".message-tip"),
    }
}


// * CALC SIMPLE PERCENT

function calcSimProfit(amount, rate, period) {
    let dayPeriod = period * 30;
    return +((amount * rate * dayPeriod / 365) / 100).toFixed(2);
}

// * SIMPLE PERCENT OUTPUT

if (COMMON_COND.formElemCheck(DEP_INPUTS.sim.all)) {
    let inpArr = [...DEP_INPUTS.sim.all];

    // * ADD CHANGE EVENT FOR DEP_INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {
            
            if (COMMON_COND.controllerClassCheck(inpArr)) {
                let values = {
                    amount: +DEP_INPUTS.sim.amount.value,
                    yearRate: +DEP_INPUTS.sim.yearRate.value,
                    period: +DEP_INPUTS.sim.period.value,
                }
                let resultObj = {
                    // * Net profit - чистый доход
                    netProfit: calcSimProfit(values.amount, values.yearRate, values.period),
                    get totalProfit() {
                        return +(this.netProfit + values.amount).toFixed(2);
                    },
                    get monthlyProfit() {
                        return +(this.netProfit / values.period).toFixed(2);
                    },
                    get pdvProfit() {
                        return `(податок = ${COMMON_VALUES.pdvFee}%) ${+(this.netProfit - (this.netProfit * (COMMON_VALUES.pdvFee / 100))).toFixed(2)}`;
                    },
                }

                setTimeout(function () {
                    outputResult(resultObj, DEP_OUTPUTS.sim);
                }, COMMON_VALUES.delay);
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

if (COMMON_COND.formElemCheck(DEP_INPUTS.cap.all)) {
    let inpArr = [...DEP_INPUTS.cap.all];
    checkScreenWidth(DEP_OUTPUTS.cap.screenTip, COMMON_VALUES.screenTipNum);

    // * ADD CHANGE EVENT FOR DEP_INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                let values = {
                    amount: +DEP_INPUTS.cap.amount.value,
                    yearRate: +DEP_INPUTS.cap.yearRate.value,
                    period: +DEP_INPUTS.cap.period.value,
                }
                // * RESULT OBJECTS
                let monthlyProfitObj = calcCapProfit(values.amount, values.yearRate, values.period);
                let totalProfitObj = calcCapProfitSum(monthlyProfitObj.amount, monthlyProfitObj.profit, values.amount, COMMON_VALUES.pdvFee);
                let totalProfitArr = Object.entries(totalProfitObj);

                setTimeout(function () {
                    DEP_OUTPUTS.cap.table.innerHTML = "";

                    createPaymentTable(DEP_OUTPUTS.cap.table, TABLE_LABELS.monthly, monthlyProfitObj.amount, monthlyProfitObj.profit);

                    // * We don't specify the second index because we need an array, not a value. 
                    // * And the loop starts as i = 1, the text value will ignored
                    createPaymentTable(DEP_OUTPUTS.cap.table, TABLE_LABELS.totalProfit, totalProfitArr[2], totalProfitArr[0]);
                    createPaymentTable(DEP_OUTPUTS.cap.table, TABLE_LABELS.feeProfit, totalProfitArr[3], totalProfitArr[1]);
                }, COMMON_VALUES.delay);
            }
        });
    }
}

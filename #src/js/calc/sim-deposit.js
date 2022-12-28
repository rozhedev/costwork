// * sim (simple) - Deposit without capitalisation

import { COMMON_VALUES } from "../data/values";
import { COMMON_COND } from "../common/conditions";
import { outputResult } from "../common/func";

const SIM_DEP_INPUTS = {
    all: document.querySelectorAll(".sim-deposit-inp"),
    amount: document.getElementById("sim-deposit-amount"),
    yearRate: document.getElementById("sim-year-rate"),
    period: document.getElementById("sim-deposit-period"),
}

const SIM_DEP_OUTPUTS = {
    profit: document.getElementById("deposit-profit-output"),
    taxProfit: document.getElementById("deposit-tax-profit-output"),
    monthlyProfit: document.getElementById("deposit-monthly-profit-output"),
    total: document.getElementById("deposit-total-output"),
}


// * CALC FUNCTION

function calcSimProfit(amount, rate, period) {
    let dayPeriod = period * 30;
    return +(amount * (rate / 100) * dayPeriod / 365).toFixed(2);
}


// * OUTPUT

if (COMMON_COND.formElemCheck(SIM_DEP_INPUTS.all)) {
    let inpArr = [...SIM_DEP_INPUTS.all];
    let values, resultObj;

    // * ADD CHANGE EVENT FOR DEP_INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                values = {
                    amount: +SIM_DEP_INPUTS.amount.value,
                    yearRate: +SIM_DEP_INPUTS.yearRate.value,
                    period: +SIM_DEP_INPUTS.period.value,
                }
                resultObj = {
                    // * Net profit - чистый доход
                    profit: calcSimProfit(
                        values.amount,
                        values.yearRate,
                        values.period
                    ),
                    get netProfit() {
                        return +(this.profit - this.profit * (COMMON_VALUES.taxPercent / 100)).toFixed(2);
                    },
                    get monthlyProfit() {
                        return +(this.netProfit / values.period).toFixed(2);
                    },
                    get totalProfit() {
                        return +(this.netProfit + values.amount).toFixed(2);
                    },
                }

                setTimeout(() => {
                    outputResult(resultObj, SIM_DEP_OUTPUTS);
                }, COMMON_VALUES.delay);
            }
        });
    }
}
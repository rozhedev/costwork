// * ann - Annuity credit

import { COMMON_VALUES, STATE_LIST } from "../data/values";
import { COMMON_COND } from "../common/conditions";
import { outputResult } from "../common/func";

const ANN_CRED_INPUTS = {
    all: document.querySelectorAll(".ann-credit-inp"),
    amount: document.getElementById("ann-credit-amount"),
    yearRate: document.getElementById("ann-year-rate"),
    period: document.getElementById("ann-credit-period"),
    oneTimeFee: document.getElementById("ann-one-time-fee"),
    monthlyFee: document.getElementById("ann-monthly-fee"),
}

const ANN_CRED_OUTPUTS = {
    overpayment: document.getElementById("ann-overpayment-output"),
    monthlyPayment: document.getElementById("ann-monthly-payment-output"),
    total: document.getElementById("ann-total-payment-output"),
    message: document.getElementById("ann-message-output"),
}

const TEXT_CONTENT = {
    termErr: "Умови кредиту невигідні для банку, так як позичальник віддає менше чим позичає. Таку пропозицію неможливо знайти.",
}


// * CALC FUNCTIONS

function calcAnnMonthlyPayment(amount, rate, period) {
    let monthlyRate = rate / 100 / 12;
    return +(amount * (monthlyRate / (1 - (1 + monthlyRate) ** -period))).toFixed(2);
}

function calcAnnOverpayment(amount, period, rate, monthlyFee) {
    return +(((calcAnnMonthlyPayment(amount, period, rate) * period) + monthlyFee * period) - amount).toFixed(2);
}


// * OUTPUT

if (COMMON_COND.formElemCheck(ANN_CRED_INPUTS.all)) {
    let inpArr = [...ANN_CRED_INPUTS.all];
    let values, resultObj;

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                values = {
                    amount: +ANN_CRED_INPUTS.amount.value,
                    yearRate: +ANN_CRED_INPUTS.yearRate.value,
                    period: +ANN_CRED_INPUTS.period.value,
                    oneTimeFee: +ANN_CRED_INPUTS.oneTimeFee.value,
                    monthlyFee: +ANN_CRED_INPUTS.monthlyFee.value,
                }
                resultObj = {
                    overpayment: calcAnnOverpayment(values.amount, values.period, values.yearRate, values.monthlyFee) + values.oneTimeFee,
                    monthlyPayment: calcAnnMonthlyPayment(values.amount, values.period, values.yearRate) + values.monthlyFee,
                    get totalPayment() {
                        return +(this.monthlyPayment * values.period + values.oneTimeFee).toFixed(2);
                    },
                }

                setTimeout(() => {
                    outputResult(resultObj, ANN_CRED_OUTPUTS);

                    // * OVERPAYMENT CHECK
                    if (resultObj.overpayment > 0) {
                        ANN_CRED_OUTPUTS.overpayment.textContent = Math.abs(resultObj.overpayment);
                        ANN_CRED_OUTPUTS.overpayment.style.color = ANN_CRED_OUTPUTS.total.style.color = COMMON_VALUES.colors.dark;

                        ANN_CRED_OUTPUTS.message.classList.remove(STATE_LIST.active);
                        ANN_CRED_OUTPUTS.message.textContent = "";
                    } else {
                        ANN_CRED_OUTPUTS.overpayment.textContent = resultObj.overpayment;
                        ANN_CRED_OUTPUTS.overpayment.style.color = ANN_CRED_OUTPUTS.total.style.color = COMMON_VALUES.colors.warning;

                        ANN_CRED_OUTPUTS.message.classList.add(STATE_LIST.active);
                        ANN_CRED_OUTPUTS.message.textContent = TEXT_CONTENT.termErr;
                    }
                }, COMMON_VALUES.delay);
            }
        });
    }
}
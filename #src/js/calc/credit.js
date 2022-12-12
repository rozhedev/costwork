import { COMMON_VALUES, TABLE_LABELS } from "../common/values";
import { COMMON_COND } from "../common/conditions";
import { outputResult, checkScreenWidth } from "../common/func";
import { createPaymentTable } from "../common/table-gen";

// * ann - Annuity credit, diff - Differential credit 

const CRED_INPUTS = {
    ann: {
        all: document.querySelectorAll(".ann-credit-inp"),
        amount: document.getElementById("ann-credit-amount"),
        yearRate: document.getElementById("ann-year-rate"),
        period: document.getElementById("ann-credit-period"),
        oneTimeFee: document.getElementById("ann-one-time-fee"),
        monthlyFee: document.getElementById("ann-monthly-fee"),
    },
    diff: {
        all: document.querySelectorAll(".diff-credit-inp"),
        amount: document.getElementById("diff-credit-amount"),
        yearRate: document.getElementById("diff-year-rate"),
        period: document.getElementById("diff-credit-period"),
        oneTimeFee: document.getElementById("diff-one-time-fee"),
        monthlyFee: document.getElementById("diff-monthly-fee"),
    }
}

const CRED_OUTPUTS = {
    ann: {
        overpayment: document.getElementById("ann-overpayment-output"),
        monthlyPayment: document.getElementById("ann-monthly-payment-output"),
        total: document.getElementById("ann-total-payment-output"),
        message: document.getElementById("ann-message-output"),
    },
    diff: {
        table: document.querySelector("#diff-table-output tbody"),
        messageTip: document.querySelector(".message-tip"),
    }
}

const TEXT_CONTENT = {
    annMessage: "Умови кредиту невигідні для банку, так як позичальник віддає менше чим позичає. Таку пропозицію неможливо знайти.",
}


// * ANNUITY CREDIT

function calcAnnMonthlyPayment(amount, rate, period) {
    let monthlyRate = rate / 100 / 12;
    return +(amount * (monthlyRate / (1 - (1 + monthlyRate) ** -period))).toFixed(2);
}

function calcAnnOverpayment(amount, period, rate, monthlyFee) {
    return +(((calcAnnMonthlyPayment(amount, period, rate) * period) + monthlyFee * period) - amount).toFixed(2);
}

// * ANNUITY OUTPUT

if (COMMON_COND.formElemCheck(CRED_INPUTS.ann.all)) {
    let inpArr = [...CRED_INPUTS.ann.all];

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                let values = {
                    amount: +CRED_INPUTS.ann.amount.value,
                    yearRate: +CRED_INPUTS.ann.yearRate.value,
                    period: +CRED_INPUTS.ann.period.value,
                    oneTimeFee: +CRED_INPUTS.ann.oneTimeFee.value,
                    monthlyFee: +CRED_INPUTS.ann.monthlyFee.value,
                }
                let resultObj = {
                    overpayment: calcAnnOverpayment(values.amount, values.period, values.yearRate, values.monthlyFee) + values.oneTimeFee,
                    monthlyPayment: calcAnnMonthlyPayment(values.amount, values.period, values.yearRate) + values.monthlyFee,
                    get totalPayment() {
                        return +(this.monthlyPayment * values.period + values.oneTimeFee).toFixed(2);
                    },
                }

                setTimeout(function () {
                    outputResult(resultObj, CRED_OUTPUTS.ann);

                    // * OVERPAYMENT CHECK
                    if (resultObj.overpayment > 0) {
                        CRED_OUTPUTS.ann.overpayment.textContent = Math.abs(resultObj.overpayment);
                        CRED_OUTPUTS.ann.overpayment.style.color = CRED_OUTPUTS.ann.total.style.color = COMMON_VALUES.colors.dark;

                        CRED_OUTPUTS.ann.message.classList.remove("_active");
                        CRED_OUTPUTS.ann.message.textContent = "";
                    } else {
                        CRED_OUTPUTS.ann.overpayment.textContent = resultObj.overpayment;
                        CRED_OUTPUTS.ann.overpayment.style.color = CRED_OUTPUTS.ann.total.style.color = COMMON_VALUES.colors.warning;

                        CRED_OUTPUTS.ann.message.classList.add("_active");
                        CRED_OUTPUTS.ann.message.textContent = TEXT_CONTENT.annMessage;
                    }
                }, COMMON_VALUES.delay);
            }
        });
    }
}


// * DIFFERENTIAL CREDIT

function calcDiffPayment(amount, rate, period, monthlyFee) {
    let primaryPayment = amount / period;
    let monthlyRate = rate / 100 / 12;
    let payObj = {
        monthlyPayment: [],
        monthlyOverpayment: [],
    };

    for (let i = 1; i <= period; i++) {
        let monthlyPercent = (amount - primaryPayment * i) * monthlyRate;
        payObj.monthlyPayment[i] = +(primaryPayment + monthlyPercent + monthlyFee).toFixed(2);
        payObj.monthlyOverpayment[i] = +(monthlyPercent + monthlyFee).toFixed(2);
    }

    return payObj;
}

// * DIFF TOTAL SUMMA

function calcDiffTotalSum(arr1, arr2, oneTimeFee) {
    let totalSumObj = {
        totalPayment: 0,
        totalOverpayment: 0,
    }

    for (let i = 1; i < arr1.length; i++) {
        totalSumObj.totalPayment += arr1[i];
        totalSumObj.totalOverpayment += arr2[i];
    }
    totalSumObj.totalPayment = +(totalSumObj.totalPayment + oneTimeFee).toFixed(2);
    totalSumObj.totalOverpayment = +(totalSumObj.totalOverpayment + oneTimeFee).toFixed(2);

    return totalSumObj;
}

// * DIFFERENTIAL EVENT

if (COMMON_COND.formElemCheck(CRED_INPUTS.diff.all)) {
    let inpArr = [...CRED_INPUTS.diff.all];
    checkScreenWidth(CRED_OUTPUTS.diff.screenTip, COMMON_VALUES.screenTipNum);

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                let values = {
                    amount: +CRED_INPUTS.diff.amount.value,
                    yearRate: +CRED_INPUTS.diff.yearRate.value,
                    period: +CRED_INPUTS.diff.period.value,
                    oneTimeFee: +CRED_INPUTS.diff.oneTimeFee.value,
                    monthlyFee: +CRED_INPUTS.diff.monthlyFee.value,
                }

                setTimeout(function () {
                    let paymentObj = calcDiffPayment(
                        values.amount,
                        values.yearRate,
                        values.period,
                        values.monthlyFee
                    );
                    let totalPaymentObj = calcDiffTotalSum(
                        paymentObj.monthlyPayment,
                        paymentObj.monthlyOverpayment,
                        values.oneTimeFee
                    );
                    let totalPaymentArr = Object.entries(totalPaymentObj);
                    CRED_OUTPUTS.diff.table.innerHTML = "";

                    createPaymentTable(
                        CRED_OUTPUTS.diff.table,
                        TABLE_LABELS.monthly,
                        paymentObj.monthlyPayment,
                        paymentObj.monthlyOverpayment
                    );

                    // * We don't specify the second index because we need an array, not a value. 
                    // * And the loop starts as i = 1, the text value will ignored
                    createPaymentTable(
                        CRED_OUTPUTS.diff.table,
                        TABLE_LABELS.totalPayment,
                        totalPaymentArr[0],
                        totalPaymentArr[1]
                    );

                }, COMMON_VALUES.delay);
            }
        });
    }
}

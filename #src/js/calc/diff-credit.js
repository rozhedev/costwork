// * diff - Differential credit 

import { COMMON_VALUES, STATE_LIST, TABLE_ID_LIST, TABLE_LABELS } from "../data/values";
import { controllerClassCheck, formElemCheck } from "../common/checkers";
import { checkScreenWidth } from "../common/helpers";
import { createPaymentTable } from "../common/table-gen";
import { getTableSlice, toggleTableItems } from "../common/table-control";

const DIFF_CRED_INPUTS = {
    all: document.querySelectorAll(".diff-credit-inp"),
    amount: document.getElementById("diff-credit-amount"),
    yearRate: document.getElementById("diff-year-rate"),
    period: document.getElementById("diff-credit-period"),
    oneTimeFee: document.getElementById("diff-one-time-fee"),
    monthlyFee: document.getElementById("diff-monthly-fee"),
}

const DIFF_CRED_OUTPUTS = {
    table: document.querySelector(`#${TABLE_ID_LIST.cred.table} tbody`),
    messageTip: document.querySelector(".message-tip"),
    btns: document.querySelectorAll(`.${COMMON_VALUES.socialBtns}`),
    showBtn: document.getElementById(`${TABLE_ID_LIST.cred.showBtn}`),
    hideBtn: document.getElementById(`${TABLE_ID_LIST.cred.hideBtn}`),
}

// * CALC MONTHLY PAYMENT

function calcDiffPayment(amount, rate, period, monthlyFee) {
    let primaryPayment = amount / period;
    let monthlyRate = rate / 100 / 12;
    let payObj = {
        monthlyPayment: [],
        monthlyOverpayment: [],
    };
    let monthlyPercent;

    for (let i = 1; i <= period; i++) {
        monthlyPercent = (amount - primaryPayment * i) * monthlyRate;
        payObj.monthlyPayment[i] = +(primaryPayment + monthlyPercent + monthlyFee).toFixed(2);
        payObj.monthlyOverpayment[i] = +(monthlyPercent + monthlyFee).toFixed(2);
    }

    return payObj;
}


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

// * OUTPUT

if (formElemCheck(DIFF_CRED_INPUTS.all)) {
    let inpArr = [...DIFF_CRED_INPUTS.all];
    let values, paymentObj, totalPaymentObj, totalPaymentArr;
    checkScreenWidth(DIFF_CRED_OUTPUTS.screenTip, COMMON_VALUES.screenTipNum);

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (controllerClassCheck(inpArr)) {
                values = {
                    amount: +DIFF_CRED_INPUTS.amount.value,
                    yearRate: +DIFF_CRED_INPUTS.yearRate.value,
                    period: +DIFF_CRED_INPUTS.period.value,
                    oneTimeFee: +DIFF_CRED_INPUTS.oneTimeFee.value,
                    monthlyFee: +DIFF_CRED_INPUTS.monthlyFee.value,
                }
                paymentObj = calcDiffPayment(
                    values.amount,
                    values.yearRate,
                    values.period,
                    values.monthlyFee
                );
                totalPaymentObj = calcDiffTotalSum(
                    paymentObj.monthlyPayment,
                    paymentObj.monthlyOverpayment,
                    values.oneTimeFee
                );
                totalPaymentArr = Object.entries(totalPaymentObj);

                setTimeout(() => {
                    DIFF_CRED_OUTPUTS.table.innerHTML = "";

                    createPaymentTable(
                        DIFF_CRED_OUTPUTS.table,
                        TABLE_LABELS.monthly,
                        paymentObj.monthlyPayment,
                        paymentObj.monthlyOverpayment
                    );
                    // * We don't specify the second index because we need an array, not a value. 
                    // * And the loop starts as i = 1, the text value will ignored
                    createPaymentTable(
                        DIFF_CRED_OUTPUTS.table,
                        TABLE_LABELS.totalPayment,
                        totalPaymentArr[0],
                        totalPaymentArr[1]
                    );
                    let tableSlice = getTableSlice(
                        TABLE_ID_LIST.cred.table,
                        STATE_LIST.show,
                        STATE_LIST.hide,
                        DIFF_CRED_OUTPUTS.showBtn,
                        DIFF_CRED_OUTPUTS.hideBtn,
                    );

                    for (const btn of DIFF_CRED_OUTPUTS.btns) {
                        // * Sailing events incorrectly work, because social-btn component inside form tag
                        btn.addEventListener("click", function (e) {
                            e.preventDefault();

                            if (this.id == TABLE_ID_LIST.cred.showBtn) {
                                toggleTableItems(
                                    tableSlice,
                                    STATE_LIST.show,
                                    STATE_LIST.hide,
                                    DIFF_CRED_OUTPUTS.showBtn,
                                    DIFF_CRED_OUTPUTS.hideBtn,
                                );
                            } else if (this.id == TABLE_ID_LIST.cred.hideBtn) {
                                toggleTableItems(
                                    tableSlice,
                                    STATE_LIST.hide,
                                    STATE_LIST.show,
                                    DIFF_CRED_OUTPUTS.hideBtn,
                                    DIFF_CRED_OUTPUTS.showBtn,
                                );
                            }
                        });
                    }
                }, COMMON_VALUES.delay);
            }
        });
    }
}

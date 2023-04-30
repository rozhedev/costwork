// * cap - Deposit with capitalisation

import { COMMON_VALUES, STATE_LIST, TABLE_ID_LIST, TABLE_LABELS } from "../data/values";
import { controllerClassCheck, formElemCheck } from "../common/checkers";
import { createPaymentTable } from "../common/table-gen";
import { getTableSlice, toggleTableItems } from "../common/table-control";

const CAP_DEP_INPUTS = {
        all: document.querySelectorAll(".cap-deposit-inp"),
        amount: document.getElementById("cap-deposit-amount"),
        yearRate: document.getElementById("cap-year-rate"),
        period: document.getElementById("cap-deposit-period"),
}

const CAP_DEP_OUTPUTS = {
        table: document.querySelector(`#${TABLE_ID_LIST.dep.table} tbody`),
        btns: document.querySelectorAll(`.${COMMON_VALUES.socialBtns}`),
        showBtn: document.getElementById(`${TABLE_ID_LIST.dep.showBtn}`),
        hideBtn: document.getElementById(`${TABLE_ID_LIST.dep.hideBtn}`),
}


// * CALC FUNCTION

function calcCapProfit(amount, rate, period, tax) {
    let payObj = {
        profit: [],
        netProfit: [],
        tax: [],
        amount: [],
        netAmount: [],
    };
    let startAmount, fullAmount, capPeriod, monthlyPercent, monthlyProfit, monthlyNetProfit;
    startAmount = fullAmount = amount;
    capPeriod = 30;

    for (let i = 1; i <= period; i++) {
        monthlyPercent = (rate / 100) * capPeriod / 365;
        monthlyProfit = (amount * ((1 + monthlyPercent) ** i)) - amount;
        monthlyNetProfit = monthlyProfit - monthlyProfit * (tax / 100);

        startAmount += monthlyNetProfit;
        fullAmount += monthlyProfit;

        payObj.profit[i] = +monthlyProfit.toFixed(2);
        payObj.netProfit[i] = +monthlyNetProfit.toFixed(2);
        payObj.amount[i] = +fullAmount.toFixed(2);
        payObj.netAmount[i] = +startAmount.toFixed(2);
        payObj.tax[i] = +(monthlyProfit - monthlyNetProfit).toFixed(2);
        startAmount = amount;
        fullAmount = amount;
    }

    return payObj;
}


// * OUTPUT

if (formElemCheck(CAP_DEP_INPUTS.all)) {
    let inpArr = [...CAP_DEP_INPUTS.all];
    let values, payObj, totalPayObj, totalPayArr;

    // * ADD CHANGE EVENT FOR DEP_INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function (e) {

            if (controllerClassCheck(inpArr)) {
                values = {
                    amount: +CAP_DEP_INPUTS.amount.value,
                    yearRate: +CAP_DEP_INPUTS.yearRate.value,
                    period: +CAP_DEP_INPUTS.period.value,
                }
                // * RESULT OBJECTS
                payObj = calcCapProfit(
                    values.amount,
                    values.yearRate,
                    values.period,
                    COMMON_VALUES.taxPercent,
                );
                totalPayObj = {
                    netAmount: payObj.netAmount.at(-1),
                    netProfit: payObj.netProfit.at(-1),
                    tax: payObj.tax.at(-1),
                    amount: payObj.amount.at(-1),
                    profit: payObj.profit.at(-1),
                }
                totalPayArr = Object.entries(totalPayObj);

                setTimeout(() => {
                    CAP_DEP_OUTPUTS.table.innerHTML = "";

                    createPaymentTable(
                        CAP_DEP_OUTPUTS.table,
                        TABLE_LABELS.monthly,
                        payObj.netAmount,
                        payObj.netProfit
                    );
                    // * We don't specify the second index because we need an array, not a value. 
                    // * And the loop starts as i = 1, the text value will ignored
                    createPaymentTable(
                        CAP_DEP_OUTPUTS.table,
                        TABLE_LABELS.profit,
                        totalPayArr[3],
                        totalPayArr[4]
                    );
                    createPaymentTable(
                        CAP_DEP_OUTPUTS.table,
                        TABLE_LABELS.taxAmount,
                        totalPayArr[2],
                        totalPayArr[2]
                    );
                    createPaymentTable(
                        CAP_DEP_OUTPUTS.table,
                        TABLE_LABELS.netProfit,
                        totalPayArr[0],
                        totalPayArr[1]
                    );
                    let tableSlice = getTableSlice(
                        TABLE_ID_LIST.dep.table,
                        STATE_LIST.show,
                        STATE_LIST.hide,
                        CAP_DEP_OUTPUTS.showBtn,
                        CAP_DEP_OUTPUTS.hideBtn,
                    );

                    for (const btn of CAP_DEP_OUTPUTS.btns) {
                        // * Sailing events incorrectly work, because social-btn component inside form tag
                        btn.addEventListener("click", function (e) {
                            e.preventDefault();

                            if (this.id == TABLE_ID_LIST.dep.showBtn) {
                                toggleTableItems(
                                    tableSlice,
                                    STATE_LIST.show,
                                    STATE_LIST.hide,
                                    CAP_DEP_OUTPUTS.showBtn,
                                    CAP_DEP_OUTPUTS.hideBtn,
                                );
                            } else if (this.id == TABLE_ID_LIST.dep.hideBtn) {
                                toggleTableItems(
                                    tableSlice,
                                    STATE_LIST.hide,
                                    STATE_LIST.show,
                                    CAP_DEP_OUTPUTS.hideBtn,
                                    CAP_DEP_OUTPUTS.showBtn,
                                );
                            }
                        });
                    }
                }, COMMON_VALUES.delay);
            }
        });
    }
}

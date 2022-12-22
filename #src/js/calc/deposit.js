import { COMMON_VALUES, STATE_LIST, TABLE_ID_LIST, TABLE_LABELS } from "../data/values";
import { COMMON_COND } from "../common/conditions";
import { outputResult, checkScreenWidth } from "../common/func";
import { createPaymentTable } from "../common/table-gen";
import { getTableSlice, toggleTableItems } from "../common/table-control";

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
        profit: document.getElementById("deposit-profit-output"),
        taxProfit: document.getElementById("deposit-tax-profit-output"),
        monthlyProfit: document.getElementById("deposit-monthly-profit-output"),
        total: document.getElementById("deposit-total-output"),
    },
    cap: {
        table: document.querySelector(`#${TABLE_ID_LIST.dep.table} tbody`),
        screenTip: document.querySelector(".message-tip"),
        btns: document.querySelectorAll(`.${COMMON_VALUES.socialBtns}`),
        showBtn: document.getElementById(`${TABLE_ID_LIST.dep.showBtn}`),
        hideBtn: document.getElementById(`${TABLE_ID_LIST.dep.hideBtn}`),
    }
}


// * CALC SIMPLE PERCENT

function calcSimProfit(amount, rate, period) {
    let dayPeriod = period * 30;
    return amount * (rate / 100) * dayPeriod / 365;
}

// * SIMPLE PERCENT OUTPUT

if (COMMON_COND.formElemCheck(DEP_INPUTS.sim.all)) {
    let inpArr = [...DEP_INPUTS.sim.all];
    let values, resultObj;

    // * ADD CHANGE EVENT FOR DEP_INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                values = {
                    amount: +DEP_INPUTS.sim.amount.value,
                    yearRate: +DEP_INPUTS.sim.yearRate.value,
                    period: +DEP_INPUTS.sim.period.value,
                }
                resultObj = {
                    // * Net profit - чистый доход
                    profit: +(calcSimProfit(
                        values.amount,
                        values.yearRate,
                        values.period
                    )).toFixed(2),
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
                    outputResult(resultObj, DEP_OUTPUTS.sim);
                }, COMMON_VALUES.delay);
            }
        });
    }
}


// * CALC CAPITALISATION PERCENT

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

// * CAPITALISATION PERCENT OUTPUT

if (COMMON_COND.formElemCheck(DEP_INPUTS.cap.all)) {
    let inpArr = [...DEP_INPUTS.cap.all];
    let values, payObj, totalPayObj, totalPayArr;
    checkScreenWidth(DEP_OUTPUTS.cap.screenTip, COMMON_VALUES.screenTipNum);

    // * ADD CHANGE EVENT FOR DEP_INPUTS
    for (const inpItem of inpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(inpArr)) {
                values = {
                    amount: +DEP_INPUTS.cap.amount.value,
                    yearRate: +DEP_INPUTS.cap.yearRate.value,
                    period: +DEP_INPUTS.cap.period.value,
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
                    DEP_OUTPUTS.cap.table.innerHTML = "";

                    createPaymentTable(
                        DEP_OUTPUTS.cap.table,
                        TABLE_LABELS.monthly,
                        payObj.netAmount,
                        payObj.netProfit
                    );
                    // * We don't specify the second index because we need an array, not a value. 
                    // * And the loop starts as i = 1, the text value will ignored
                    createPaymentTable(
                        DEP_OUTPUTS.cap.table,
                        TABLE_LABELS.profit,
                        totalPayArr[3],
                        totalPayArr[4]
                    );
                    createPaymentTable(
                        DEP_OUTPUTS.cap.table,
                        TABLE_LABELS.taxAmount,
                        totalPayArr[2],
                        totalPayArr[2]
                    );
                    createPaymentTable(
                        DEP_OUTPUTS.cap.table,
                        TABLE_LABELS.netProfit,
                        totalPayArr[0],
                        totalPayArr[1]
                    );
                    let tableSlice = getTableSlice(
                        TABLE_ID_LIST.dep.table,
                        STATE_LIST.show,
                        STATE_LIST.hide,
                        DEP_OUTPUTS.cap.showBtn,
                        DEP_OUTPUTS.cap.hideBtn,
                    );

                    for (const btn of DEP_OUTPUTS.cap.btns) {
                        // * Sailing events incorrectly work, because social-btn component inside form tag
                        btn.addEventListener("click", function (e) {
                            e.preventDefault();

                            if (this.id == TABLE_ID_LIST.dep.showBtn) {
                                toggleTableItems(
                                    tableSlice,
                                    STATE_LIST.show,
                                    STATE_LIST.hide,
                                    DEP_OUTPUTS.cap.showBtn,
                                    DEP_OUTPUTS.cap.hideBtn,
                                );
                            } else if (this.id == TABLE_ID_LIST.dep.hideBtn) {
                                toggleTableItems(
                                    tableSlice,
                                    STATE_LIST.hide,
                                    STATE_LIST.show,
                                    DEP_OUTPUTS.cap.hideBtn,
                                    DEP_OUTPUTS.cap.showBtn,
                                );
                            }
                        });
                    }
                }, COMMON_VALUES.delay);
            }
        });
    }
}

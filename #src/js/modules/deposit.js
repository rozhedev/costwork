// * sim (simple) - Deposit without capitalisation
// * cap - Deposit with capitalisation

const allFormInp = document.querySelectorAll(".inp");
const simDepositAmount = document.getElementById("sim-deposit-amount");
const simYearRate = document.getElementById("sim-year-rate");
const simDepositPeriod = document.getElementById("sim-deposit-period");

const depositTotalOutput = document.getElementById("deposit-total-output");
const depositProfitOutput = document.getElementById("deposit-profit-output");
const depositMonthProfitOutput = document.getElementById("deposit-month-profit-output");

let delay = 1000;

// * CALC SIMPLE PERCENT

function calcSimProfit(amount, rate, period) {
    return +((amount * rate * period / 365) / 100).toFixed(2);
}

// * SIMPLE PERCENT OUTPUT

if (simDepositAmount && simYearRate && simDepositPeriod) {
    const simDepositAmountController = simDepositAmount.parentElement;
    const simYearRateController = simYearRate.parentElement;
    const simDepositPeriodController = simDepositPeriod.parentElement;

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of allFormInp) {
        inpItem.addEventListener("change", function () {

            if (simDepositAmountController.classList.contains("_success") && simYearRateController.classList.contains("_success") && simDepositPeriodController.classList.contains("_success")) {

                let simDepositAmountValue = +document.querySelector("#sim-deposit-amount").value;
                let simYearRateValue = +document.querySelector("#sim-year-rate").value;
                let simDepositPeriodValue = +document.querySelector("#sim-deposit-period").value;

                setTimeout(function () {
                    let simTotalProfit = +(calcSimProfit(simDepositAmountValue, simYearRateValue, simDepositPeriodValue) + simDepositAmountValue).toFixed(2);
                    depositTotalOutput.textContent = simTotalProfit;

                    let simNetProfit = +(calcSimProfit(simDepositAmountValue, simYearRateValue, simDepositPeriodValue)).toFixed(2);
                    depositProfitOutput.textContent = simNetProfit;
                    // * Средний месячний доход
                    // let simNetProfit = +(calcSimProfit(simDepositAmountValue, simYearRateValue, simDepositPeriodValue)).toFixed(2);
                    // depositProfitOutput.textContent = simNetProfit;
                }, delay);
            }
        });
    }
}


// * DIFFERENTIAL CREDIT

const diffCreditAmount = document.getElementById("diff-credit-amount");
const diffYearRate = document.getElementById("diff-percent-rate");
const diffCreditPeriod = document.getElementById("diff-credit-period");
const diffOneTimeFee = document.getElementById("diff-one-time-fee");
const diffMonthlyFee = document.getElementById("diff-monthly-fee");

const diffTotalPaymentOutput = document.getElementById("diff-total-payment-output");
const diffOverpaymentOutput = document.getElementById("diff-overpayment-output");
const diffTableOutput = document.querySelector("#diff-table-output tbody");

function calcDiffPayment(amount, rate, period, monthlyFee) {
    let primaryPayment = amount / period;
    let monthlyRate = rate / 100 / 12;
    let monthlyPayobj = {
        monthlyPayment: [],
        monthlyOverpayment: [],
    };

    for (i = 1; i <= period; i++) {
        let monthlyPercent = (amount - primaryPayment * i) * monthlyRate;
        monthlyPayobj.monthlyPayment[i] = +(primaryPayment + monthlyPercent + monthlyFee).toFixed(2);
    }
    for (i = 1; i <= period; i++) {
        let monthlyPercent = (amount - primaryPayment * i) * monthlyRate;
        monthlyPayobj.monthlyOverpayment[i] = +(monthlyPercent + monthlyFee).toFixed(2);
    }
    return monthlyPayobj;
}

// * DIFF TOTAL SUMMA

function calcDiffTotalSum(arr1, arr2, oneTimeFee) {
    let paymentSumObj = {
        monthlyPaymentSum: 0,
        monthlyOverpaymentSum: 0,
    }

    for (let i = 1; i < arr1.length; i++) {
        paymentSumObj.monthlyPaymentSum += arr1[i];
        paymentSumObj.monthlyOverpaymentSum += arr2[i];
    }
    paymentSumObj.monthlyPaymentSum = +(paymentSumObj.monthlyPaymentSum + oneTimeFee).toFixed(2);
    paymentSumObj.monthlyOverpaymentSum = +(paymentSumObj.monthlyOverpaymentSum + oneTimeFee).toFixed(2);

    return paymentSumObj;
}

// * OUTPUT FUNCTION
// * Спешил, поэтому не успел часть f(x) в отдельный модуль вынести

function createPaymentTable(table, arr1, arr2, totalSum1, totalSum2) {
    for (let i = 1; i < arr1.length; i++) {
        let tableItem = document.createElement("tr");
        tableItem.classList.add("payment-table__item");

        tableItem.innerHTML += `
        <td class="payment-table__item-label navlink">
            ${i} платіж:
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${arr1[i]}</span>
            <span class="navlink currency">UAH</span>
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${arr2[i]}</span>
            <span class="navlink currency">UAH</span>
        </td>
              `;

        table.appendChild(tableItem);
    }

    let tableItemSum = document.createElement("tr");
    tableItemSum.classList.add("payment-table__item");
    tableItemSum.innerHTML += `
        <td class="payment-table__item-label navlink">
            Сумма:
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${totalSum1}</span>
            <span class="navlink currency">UAH</span>
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${totalSum2}</span>
            <span class="navlink currency">UAH</span>
        </td>
              `;
    table.appendChild(tableItemSum);
}

// * DIFFERENTIAL EVENT

// if (diffCreditAmount && diffYearRate && diffCreditPeriod) {
//     const diffCreditAmountController = diffCreditAmount.parentElement;
//     const diffYearRateController = diffYearRate.parentElement;
//     const diffCreditPeriodController = diffCreditPeriod.parentElement;
//     const messageTip = document.querySelector(".message-tip");

//     // * ADD CHANGE EVENT FOR INPUTS
//     for (inpItem of allFormInp) {
//         inpItem.addEventListener("change", function () {

//             if (diffCreditAmountController.classList.contains("_success") && diffYearRateController.classList.contains("_success") && diffCreditPeriodController.classList.contains("_success")) {

//                 let diffCreditAmountValue = +document.querySelector("#diff-credit-amount").value;
//                 let diffYearRateValue = +document.querySelector("#diff-percent-rate").value;
//                 let diffCreditPeriodValue = +document.querySelector("#diff-credit-period").value;
//                 let diffOneTimeFeeValue = +document.querySelector("#diff-one-time-fee").value;
//                 let diffMonthlyFeeValue = +document.querySelector("#diff-monthly-fee").value;

//                 setTimeout(function () {
//                     let paymentObj = calcDiffPayment(diffCreditAmountValue, diffYearRateValue, diffCreditPeriodValue, diffMonthlyFeeValue);
//                     let totalSumObj = calcDiffTotalSum(paymentObj.monthlyPayment, paymentObj.monthlyOverpayment, diffOneTimeFeeValue);
//                     diffTableOutput.innerHTML = "";

//                     createPaymentTable(diffTableOutput, paymentObj.monthlyPayment, paymentObj.monthlyOverpayment, totalSumObj.monthlyPaymentSum, totalSumObj.monthlyOverpaymentSum);
//                 }, delay);
//             }
//         });
//     }
// }

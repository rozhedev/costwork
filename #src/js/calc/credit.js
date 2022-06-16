// * ann - Annuity credit, diff - Differential credit 

const allFormInp = document.querySelectorAll(".inp");
const annCreditAmount = document.getElementById("ann-credit-amount");
const annYearRate = document.getElementById("ann-percent-rate");
const annCreditPeriod = document.getElementById("ann-credit-period");
const annOneTimeFee = document.getElementById("ann-one-time-fee");
const annMonthlyFee = document.getElementById("ann-monthly-fee");

const annTotalPaymentOutput = document.getElementById("ann-total-payment-output");
const annOverpaymentOutput = document.getElementById("ann-overpayment-output");
const annMonthlyPaymentOutput = document.getElementById("ann-monthly-payment-output");
const annMessageOutput = document.getElementById("ann-message-output");

let delay = 1000;
let mobileBreakpoint = 536;
let warningColor = "#0075c4";
let darkColor = "#0d090a";

// * ANNUITY CREDIT

function calcAnnMonthlyPayment(amount, rate, period) {
    let monthlyRate = rate / 100 / 12;
    return +(amount * (monthlyRate / (1 - (1 + monthlyRate) ** -period))).toFixed(2);
}

function calcAnnOverpayment(amount, period, rate) {
    return +((calcAnnMonthlyPayment(amount, period, rate) * period) - amount).toFixed(2);
}

// * ANNUITY OUTPUT

if (annCreditAmount && annYearRate && annCreditPeriod) {
    const annCreditAmountController = annCreditAmount.parentElement;
    const annYearRateController = annYearRate.parentElement;
    const annCreditPeriodController = annCreditPeriod.parentElement;

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of allFormInp) {
        inpItem.addEventListener("change", function () {

            if (annCreditAmountController.classList.contains("_success") && annYearRateController.classList.contains("_success") && annCreditPeriodController.classList.contains("_success")) {

                let annCreditAmountValue = +annCreditAmount.value;
                let annYearRateValue = +annYearRate.value;
                let annCreditPeriodValue = +annCreditPeriod.value;
                let annOneTimeFeeValue = +annOneTimeFee.value;
                let annMonthlyFeeValue = +annMonthlyFee.value;

                setTimeout(function () {
                    let annMonthlyPayment = (calcAnnMonthlyPayment(annCreditAmountValue, annCreditPeriodValue, annYearRateValue) + annMonthlyFeeValue).toFixed(2);
                    annMonthlyPaymentOutput.textContent = annMonthlyPayment;

                    let annTotalPayment = (annMonthlyPayment * annCreditPeriodValue + annOneTimeFeeValue).toFixed(2);
                    annTotalPaymentOutput.textContent = annTotalPayment;

                    let annOverpayment = (calcAnnOverpayment(annCreditAmountValue, annCreditPeriodValue, annYearRateValue) + annOneTimeFeeValue).toFixed(2);

                    // * OVERPAYMENT CHECK
                    if (annOverpayment > 0) {
                        annOverpaymentOutput.textContent = Math.abs(annOverpayment);
                        annTotalPaymentOutput.style.color = darkColor;
                        annOverpaymentOutput.style.color = darkColor;
                        annMessageOutput.classList.remove("_active");
                        annMessageOutput.textContent = "";

                    } else {
                        annOverpaymentOutput.textContent = annOverpayment;
                        annTotalPaymentOutput.style.color = warningColor;
                        annOverpaymentOutput.style.color = warningColor;
                        annMessageOutput.classList.add("_active");
                        annMessageOutput.textContent = "Умови кредиту невигідні для банку, так як позичальник віддає менше чим позичає. Таку пропозицію неможливо знайти.";
                    }
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
const diffTableOutput = document.querySelector("#diff-table-output tbody");

function calcDiffPayment(amount, rate, period, monthlyFee) {
    let primaryPayment = amount / period;
    let monthlyRate = rate / 100 / 12;
    let monthlyPayobj = {
        monthlyPayment: [],
        monthlyOverpayment: [],
    };

    for (let i = 1; i <= period; i++) {
        let monthlyPercent = (amount - primaryPayment * i) * monthlyRate;
        monthlyPayobj.monthlyPayment[i] = +(primaryPayment + monthlyPercent + monthlyFee).toFixed(2);
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

function createPaymentTable(table, arr1, arr2, totalSum1, totalSum2) {
    for (let i = 1; i <= arr1.length; i++) {
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

if (diffCreditAmount && diffYearRate && diffCreditPeriod) {
    const diffCreditAmountController = diffCreditAmount.parentElement;
    const diffYearRateController = diffYearRate.parentElement;
    const diffCreditPeriodController = diffCreditPeriod.parentElement;
    const messageTip = document.querySelector(".message-tip");

    // * SCREEN WIDTH CHECK
    if (document.documentElement.clientWidth < 536) {
        messageTip.classList.add("_active");
    }
    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of allFormInp) {
        inpItem.addEventListener("change", function () {

            if (diffCreditAmountController.classList.contains("_success") && diffYearRateController.classList.contains("_success") && diffCreditPeriodController.classList.contains("_success")) {

                let diffCreditAmountValue = +diffCreditAmount.value;
                let diffYearRateValue = +diffYearRate.value;
                let diffCreditPeriodValue = +diffCreditPeriod.value;
                let diffOneTimeFeeValue = +diffOneTimeFee.value;
                let diffMonthlyFeeValue = +diffMonthlyFee.value;

                setTimeout(function () {
                    let paymentObj = calcDiffPayment(diffCreditAmountValue, diffYearRateValue, diffCreditPeriodValue, diffMonthlyFeeValue);
                    let totalSumObj = calcDiffTotalSum(paymentObj.monthlyPayment, paymentObj.monthlyOverpayment, diffOneTimeFeeValue);
                    diffTableOutput.innerHTML = "";

                    createPaymentTable(diffTableOutput, paymentObj.monthlyPayment, paymentObj.monthlyOverpayment, totalSumObj.monthlyPaymentSum, totalSumObj.monthlyOverpaymentSum);
                }, delay);
            }
        });
    }
}

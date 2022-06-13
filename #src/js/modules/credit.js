// * ann - Annuity credit
// * diff - Differential credit 

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

let errorRedColor = "#cf5c36";
let darkColor = "#0d090a";
let delay = 3000;

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
    for (inpItem of allFormInp) {

        // if (inpItem.classList.contains("_success")) {
            inpItem.addEventListener("input", function () {

                if (annCreditAmount.value != "" && annYearRate.value != "" && annCreditPeriod.value != "") {
                    let annCreditAmountValue = +document.querySelector("#ann-credit-amount").value;
                    let annYearRateValue = +document.querySelector("#ann-percent-rate").value;
                    let annCreditPeriodValue = +document.querySelector("#ann-credit-period").value;
                    let annOneTimeFeeValue = +document.querySelector("#ann-one-time-fee").value;
                    let annMonthlyFeeValue = +document.querySelector("#ann-monthly-fee").value;

                    setTimeout(function () {
                        let annMonthlyPayment = (calcAnnMonthlyPayment(annCreditAmountValue, annCreditPeriodValue, annYearRateValue) + annMonthlyFeeValue).toFixed(2);
                        annMonthlyPaymentOutput.textContent = annMonthlyPayment;

                        let annTotalPayment = (annMonthlyPayment * annCreditPeriodValue + annOneTimeFeeValue).toFixed(2);
                        annTotalPaymentOutput.textContent = annTotalPayment;

                        let annOverpayment = (calcAnnOverpayment(annCreditAmountValue, annCreditPeriodValue, annYearRateValue) + annOneTimeFeeValue).toFixed(2);

                        if (annOverpayment > 0) {
                            annOverpaymentOutput.textContent = Math.abs(annOverpayment);
                            annOverpaymentOutput.style.color = darkColor;
                            annMessageOutput.textContent = "";

                        } else {
                            annOverpaymentOutput.textContent = annOverpayment;
                            annOverpaymentOutput.style.color = errorRedColor;
                            annMessageOutput.textContent = "Умови кредиту невигідні для банку, так як позичальник віддає менше чим позичає. Таку пропозицію неможливо знайти.";
                        }
                    }, delay);
                }
            });
        }
    // }
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
    console.log(monthlyPayobj);
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

// * OUTPUT

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

if (diffCreditAmount && diffYearRate && diffCreditPeriod) {
    for (inpItem of allFormInp) {

        // if (inpItem.classList.contains("_success")) {
            inpItem.addEventListener("input", function () {

                if (diffCreditAmount.value != "" && diffYearRate.value != "" && diffCreditPeriod.value != "") {
                    let diffCreditAmountValue = +document.querySelector("#diff-credit-amount").value;
                    let diffYearRateValue = +document.querySelector("#diff-percent-rate").value;
                    let diffCreditPeriodValue = +document.querySelector("#diff-credit-period").value;
                    let diffOneTimeFeeValue = +document.querySelector("#diff-one-time-fee").value;
                    let diffMonthlyFeeValue = +document.querySelector("#diff-monthly-fee").value;

                    setTimeout(function () {
                        let paymentObj = calcDiffPayment(diffCreditAmountValue, diffYearRateValue, diffCreditPeriodValue, diffMonthlyFeeValue);
                        let totalSumObj = calcDiffTotalSum(paymentObj.monthlyPayment, paymentObj.monthlyOverpayment, diffOneTimeFeeValue);
                        diffTableOutput.innerHTML = "";

                        createPaymentTable(diffTableOutput, paymentObj.monthlyPayment, paymentObj.monthlyOverpayment, totalSumObj.monthlyPaymentSum, totalSumObj.monthlyOverpaymentSum);
                    }, delay);
                }
            });
        // }
    }
}
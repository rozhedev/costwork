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
    let monthlyRate = rate / (100 * 12);
    return +(amount * (monthlyRate / (1 - (1 + monthlyRate) ** -period))).toFixed(2);
}

function calcAnnOverpayment(amount, period, rate) {
    return +((calcAnnMonthlyPayment(amount, period, rate) * period) - amount).toFixed(2);
}

// * OUTPUT

if (annCreditAmount && annYearRate && annCreditPeriod) {
    for (inpItem of allFormInp) {
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
}

// * DIFFERENTIAL CREDIT

const diffCreditAmount = document.getElementById("diff-credit-amount");
const diffYearRate = document.getElementById("diff-percent-rate");
const diffCreditPeriod = document.getElementById("diff-credit-period");
const diffOneTimeFee = document.getElementById("diff-one-time-fee");
const diffMonthlyFee = document.getElementById("diff-monthly-fee");

const diffTotalPaymentOutput = document.getElementById("diff-total-payment-output");
const diffOverpaymentOutput = document.getElementById("diff-overpayment-output");
const diffMessageOutput = document.getElementById("diff-message-output");
const diffOutputTable = document.getElementById("diff-payment-table");

function calcDiffMonthlyPayment(amount, rate, period) {
    let primaryPayment = amount / period;
    let arr = [];

    for (i = 1; i <= period; i++) {
        let percentPayment = (amount - 500 * i) * (rate / 100) / 365 * 30;
        arr[i] = +(primaryPayment + percentPayment).toFixed(2);
    }
    return arr;
}

// * OUTPUT

if (diffCreditAmount && diffYearRate && diffCreditPeriod) {
    for (inpItem of allFormInp) {
        inpItem.addEventListener("input", function () {

            if (diffCreditAmount.value != "" && diffYearRate.value != "" && diffCreditPeriod.value != "") {
                let diffCreditAmountValue = +document.querySelector("#diff-credit-amount").value;
                let diffYearRateValue = +document.querySelector("#diff-percent-rate").value;
                let diffCreditPeriodValue = +document.querySelector("#diff-credit-period").value;
                let diffOneTimeFeeValue = +document.querySelector("#diff-one-time-fee").value;
                let diffMonthlyFeeValue = +document.querySelector("#diff-monthly-fee").value;

                setTimeout(function () {
                    let diffMonthlyPayment = calcDiffMonthlyPayment(diffCreditAmountValue, diffCreditPeriodValue, diffYearRateValue) + diffMonthlyFeeValue;
                    annMonthlyPaymentOutput.textContent = diffMonthlyPayment;

                    let diffTotalPayment = (diffMonthlyPayment * diffCreditPeriodValue + diffOneTimeFeeValue).toFixed(2);
                    diffTotalPaymentOutput.textContent = diffTotalPayment;

                    let diffOverpayment = calcAnnOverpayment(diffCreditAmountValue, diffCreditPeriodValue, diffYearRateValue);
                    if (diffOverpayment > 0) {
                        diffOverpaymentOutput.textContent = Math.abs(diffOverpayment);
                    } else {
                        diffOverpaymentOutput.textContent = diffOverpayment;
                        diffOverpaymentOutput.style.color = errorRedColor;
                        diffMessageOutput.textContent = "Умови кредиту невигідні для банку, так як позичальник віддає менше чим позичає. Таку пропозицію неможливо знайти.";
                    }
                }, delay);
            }
        });
    }
}

// function getTableRate() {
//     for (let i = 0; i < currenciesInfo.length; i++) {
//         // * CREATE TABLE

//         let tableItem = document.createElement("tr");
//         tableItem.classList.add("payment-table__item");

//         tableItem.innerHTML += `<td class="payment-table__item-content">
//                   <h3 class="payment-table__item-title">${currenciesInfo[i].titleName}</h3>
//               </td>
//               <td class="payment-table__item-course"></td>
//               `;

//         cryptoRateTable.appendChild(tableItem);
//     }
// }

// let temp = calcDiffMonthlyPayment(creditAmount, yearRate, creditPeriod);

// for (let i = 1; i < temp.length; i++) {
//     console.log(`${i} платіж - ${temp[i]}`);
// }
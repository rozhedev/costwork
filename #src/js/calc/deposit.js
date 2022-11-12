// * sim (simple) - Deposit without capitalisation, cap - Deposit with capitalisation

const simFormInputs = document.querySelectorAll(".sim-deposit-inp");
const simDepositAmount = document.getElementById("sim-deposit-amount");
const simYearRate = document.getElementById("sim-year-rate");
const simDepositPeriod = document.getElementById("sim-deposit-period");

const depositTotalOutput = document.getElementById("deposit-total-output");
const depositProfitOutput = document.getElementById("deposit-profit-output");
const depositMonthProfitOutput = document.getElementById("deposit-month-profit-output");
const depositPdvProfitOutput = document.getElementById("deposit-pdv-profit-output");

let delay = 1000;
let pdvTax = 19.5;

// * CALC SIMPLE PERCENT

function calcSimProfit(amount, rate, period) {
    let dayPeriod = period * 30;
    return +((amount * rate * dayPeriod / 365) / 100).toFixed(2);
}

// * SIMPLE PERCENT OUTPUT

if (simFormInputs && simDepositAmount && simYearRate && simDepositPeriod) {
    let simFormInputsArr = [...simFormInputs];

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of simFormInputsArr) {
        inpItem.addEventListener("change", function () {
            // * Condition which check _success class in all form controllers
            let formControllerCond = simFormInputsArr.every((item) => item.parentElement.classList.contains("_success"));

            if (formControllerCond) {
                let simDepositAmountValue = +simDepositAmount.value;
                let simYearRateValue = +simYearRate.value;
                let simDepositPeriodValue = +simDepositPeriod.value;

                setTimeout(function () {
                    let simNetProfit = +(calcSimProfit(simDepositAmountValue, simYearRateValue, simDepositPeriodValue)).toFixed(2);
                    depositProfitOutput.textContent = simNetProfit;

                    let simTotalProfit = (simNetProfit + simDepositAmountValue).toFixed(2);
                    depositTotalOutput.textContent = simTotalProfit;

                    let simMonthProfit = +(simNetProfit / simDepositPeriodValue).toFixed(2);
                    depositMonthProfitOutput.textContent = simMonthProfit;

                    let simPdvProfit = `(податок = ${pdvTax}%) ${+(simNetProfit - (simNetProfit * (pdvTax / 100))).toFixed(2)}`;
                    depositPdvProfitOutput.textContent = simPdvProfit;
                }, delay);
            }
        });
    }
}


// * CALC CAPITALISATION PERCENT

const capFormInputs = document.querySelectorAll(".cap-deposit-inp");
const capDepositAmount = document.getElementById("cap-deposit-amount");
const capYearRate = document.getElementById("cap-year-rate");
const capDepositPeriod = document.getElementById("cap-deposit-period");
const capTableOutput = document.querySelector("#deposit-table-output tbody");

function calcCapProfit(amount, rate, period) {
    let monthlyProfitObj = {
        monthlyAmount: [],
        monthlyProfit: [],
    };
    let dayPeriod = period * 30;
    let startAmount = amount;

    for (let i = 1; i <= period; i++) {
        let yearRate = rate / 100;
        let monthlyPercent = amount * ((1 + yearRate / 365) ** dayPeriod);
        amount += (monthlyPercent - amount);

        monthlyProfitObj.monthlyProfit[i] = +(monthlyPercent / dayPeriod).toFixed(2);
    }

    for (let i = 1; i <= period; i++) {
        let temp = monthlyProfitObj.monthlyProfit[i];
        if (i == 1) {
            monthlyProfitObj.monthlyAmount[i] = +(temp + startAmount).toFixed(2);
        } else {
            monthlyProfitObj.monthlyAmount[i] = temp + monthlyProfitObj.monthlyAmount[i - 1];
            monthlyProfitObj.monthlyAmount[i] = +(monthlyProfitObj.monthlyAmount[i]).toFixed(2);
        }
    }

    return monthlyProfitObj;
}

// * CAPITALISATION TOTAL SUMMA

function calcCapProfitSum(arr1, arr2, amount, pdv) {
    let profitSumObj = {
        monthlyProfitSum: 0,
        monthlyProfitSumPdv: 0,
        monthlyAmountSum: 0,
        monthlyAmountSumPdv: 0,
    }
    for (let i = 1; i < arr2.length; i++) {
        profitSumObj.monthlyProfitSum += arr2[i];
    }
    profitSumObj.monthlyProfitSum = +(profitSumObj.monthlyProfitSum).toFixed(2);
    profitSumObj.monthlyProfitSumPdv = +(profitSumObj.monthlyProfitSum - profitSumObj.monthlyProfitSum * (pdv / 100)).toFixed(2);

    profitSumObj.monthlyAmountSum = arr1[arr1.length - 1];
    profitSumObj.monthlyAmountSumPdv = amount + profitSumObj.monthlyProfitSumPdv;

    return profitSumObj;
}

// * OUTPUT FUNCTION
// * Спешил, поэтому не успел f(x) в отдельный модуль вынести
// TODO, напиши условие, которое будет проверять currency-switcher и подставлять нужное значение

function createPaymentTable(table, arr1, arr2, totalSum1, totalSum2, totalSum3, totalSum4, pdv) {
    for (let i = 1; i < arr1.length; i++) {
        let tableItem = document.createElement("tr");
        tableItem.classList.add("payment-table__item");

        tableItem.innerHTML += `
        <td class="payment-table__item-label navlink">
            ${i} місяць:
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
    let tableItemSumPdv = document.createElement("tr");
    tableItemSum.classList.add("payment-table__item");
    tableItemSumPdv.classList.add("payment-table__item");

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

    tableItemSumPdv.innerHTML += `
        <td class="payment-table__item-label navlink">
        З урах. податків (${pdv}%):
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${totalSum3}</span>
            <span class="navlink currency">UAH</span>
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${totalSum4}</span>
            <span class="navlink currency">UAH</span>
        </td>
            `;

    table.appendChild(tableItemSum);
    table.appendChild(tableItemSumPdv);
}

// * CAPITALISATION PERCENT OUTPUT

if (capFormInputs && capDepositAmount && capYearRate && capDepositPeriod) {
    const messageTip = document.querySelector(".message-tip");

    // * SCREEN WIDTH CHECK
    if (document.documentElement.clientWidth < 536) {
        messageTip.classList.add("_active");
    }
    let capFormInputsArr = [...capFormInputs];

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of capFormInputsArr) {
        inpItem.addEventListener("change", function () {
            // * Condition which check _success class in all form controllers
            let formControllerCond = capFormInputsArr.every((item) => item.parentElement.classList.contains("_success"));

            if (formControllerCond) {
                let capDepositAmountValue = +capDepositAmount.value;
                let capYearRateValue = +capYearRate.value;
                let capDepositPeriodValue = +capDepositPeriod.value;

                setTimeout(function () {
                    let profitObj = calcCapProfit(capDepositAmountValue, capYearRateValue, capDepositPeriodValue);
                    let totalProfitObj = calcCapProfitSum(profitObj.monthlyAmount, profitObj.monthlyProfit, capDepositAmountValue, pdvTax);

                    capTableOutput.innerHTML = "";
                    createPaymentTable(capTableOutput, profitObj.monthlyAmount, profitObj.monthlyProfit, totalProfitObj.monthlyAmountSum, totalProfitObj.monthlyProfitSum, totalProfitObj.monthlyAmountSumPdv, totalProfitObj.monthlyProfitSumPdv, pdvTax);

                }, delay);
            }
        });
    }
}

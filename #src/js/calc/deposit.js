// * sim (simple) - Deposit without capitalisation, cap - Deposit with capitalisation

const INPUTS = {
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

const OUTPUTS = {
    sim: {
        total: document.getElementById("deposit-total-output"),
        profit: document.getElementById("deposit-profit-output"),
        monthProfit: document.getElementById("deposit-month-profit-output"),
        fee: document.getElementById("deposit-pdv-profit-output"),
    },
    cap: {
        table: document.querySelector("#deposit-table-output tbody"),
        screenTip: document.querySelector(".message-tip"),
    }
}

let delay = 1000;
let pdvFee = 19.5;
let screenTipNum = 536


// * CALC SIMPLE PERCENT

function calcSimProfit(amount, rate, period) {
    let dayPeriod = period * 30;
    return +((amount * rate * dayPeriod / 365) / 100).toFixed(2);
}

// * SIMPLE PERCENT OUTPUT

if (INPUTS.sim.all && INPUTS.sim.amount && INPUTS.sim.yearRate && INPUTS.sim.period) {
    let inpArr = [...INPUTS.sim.all];

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of inpArr) {
        inpItem.addEventListener("change", function () {
            // * Condition which check _success class in all form controllers
            let formControllerCond = inpArr.every((item) => item.parentElement.classList.contains("_success"));

            if (formControllerCond) {
                let amountValue = +INPUTS.sim.amount.value;
                let yearRateValue = +INPUTS.sim.yearRate.value;
                let periodValue = +INPUTS.sim.period.value;

                setTimeout(function () {
                    // * Net profit - чистый доход
                    let netProfit = +(calcSimProfit(amountValue, yearRateValue, periodValue)).toFixed(2);
                    let totalProfit = +(netProfit + amountValue).toFixed(2);
                    let monthProfit = +(netProfit / periodValue).toFixed(2);
                    let pdvProfit = `(податок = ${pdvFee}%) ${+(netProfit - (netProfit * (pdvFee / 100))).toFixed(2)}`;

                    OUTPUTS.sim.profit.textContent = netProfit;
                    OUTPUTS.sim.total.textContent = totalProfit;
                    OUTPUTS.sim.monthProfit.textContent = monthProfit;
                    OUTPUTS.sim.fee.textContent = pdvProfit;
                }, delay);
            }
        });
    }
}


// * CALC CAPITALISATION PERCENT

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

if (INPUTS.cap.all && INPUTS.cap.amount && INPUTS.cap.yearRate && INPUTS.cap.period) {

    // * SCREEN WIDTH CHECK
    if (
        OUTPUTS.cap.screenTip &&
        document.documentElement.clientWidth < screenTipNum
    ) {
        OUTPUTS.cap.screenTip.classList.add("_active");
    }

    let inpArr = [...INPUTS.cap.all];

    // * ADD CHANGE EVENT FOR INPUTS
    for (inpItem of inpArr) {
        inpItem.addEventListener("change", function () {
            // * Condition which check _success class in all form controllers
            let formControllerCond = inpArr.every((item) => item.parentElement.classList.contains("_success"));

            if (formControllerCond) {
                let amountValue = +INPUTS.cap.amount.value;
                let yearRateValue = +INPUTS.cap.yearRate.value;
                let periodValue = +INPUTS.cap.period.value;

                setTimeout(function () {
                    let profitObj = calcCapProfit(amountValue, yearRateValue, periodValue);
                    let totalProfitObj = calcCapProfitSum(profitObj.monthlyAmount, profitObj.monthlyProfit, amountValue, pdvFee);

                    OUTPUTS.cap.table.innerHTML = "";
                    createPaymentTable(OUTPUTS.cap.table, profitObj.monthlyAmount, profitObj.monthlyProfit, totalProfitObj.monthlyAmountSum, totalProfitObj.monthlyProfitSum, totalProfitObj.monthlyAmountSumPdv, totalProfitObj.monthlyProfitSumPdv, pdvFee);

                }, delay);
            }
        });
    }
}

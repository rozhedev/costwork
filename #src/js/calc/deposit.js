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
let screenTipNum = 536;

const TABLE_ITEM_TITLES = {
    month: "місяць:",
    totalProfit: "Загальний дохід:",
    feeProfit: `З урах. податків (${pdvFee}%):`,
}


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
                // TODO исправь ошибку this, по итогу вычислений получаем NaN
                const values = {
                    amount: +INPUTS.sim.amount.value,
                    yearRate: +INPUTS.sim.yearRate.value,
                    period: +INPUTS.sim.period.value,
                }

                setTimeout(function () {
                    // const profitObj = {
                    //     // * Net profit - чистый доход
                    //     netProfit: calcSimProfit(values.amount, values.yearRate, values.period),
                    //     totalProfit: +(this.netProfit + values.amount).toFixed(2),
                    //     monthProfit: +(this.netProfit / values.period).toFixed(2),
                    //     pdvProfit: `(податок = ${pdvFee}%) ${+(this.netProfit - (this.netProfit * (pdvFee / 100))).toFixed(2)}`,
                    // }

                    // for (let resultItem in profitObj) {
                    //     for (let outputItem in OUTPUTS.sim) {
                    //         outputItem.textContent = resultItem;
                    //     }
                    // }

                    let netProfit = calcSimProfit(values.amount, values.yearRate, values.period);
                    let totalProfit = +(netProfit + values.amount).toFixed(2);
                    let monthProfit = +(netProfit / values.period).toFixed(2);
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
// TODO, напиши условие, которое будет проверять currency-switcher и подставлять нужное значение

function createPaymentTable(table, title, profitValuesArr, feeValuesArr) {
    let tempTitle = title;
    for (let i = 1; i < profitValuesArr.length; i++) {
        let tableItem = document.createElement("tr");
        tableItem.classList.add("payment-table__item");

        if (typeof profitValuesArr[0] !== "string") {
            title = ``;
            title = `${i} ${tempTitle}`;
        }
        tableItem.innerHTML += `
        <td class="payment-table__item-label navlink">
            ${title}
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${profitValuesArr[i]}</span>
            <span class="navlink currency">UAH</span>
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">${feeValuesArr[i]}</span>
            <span class="navlink currency">UAH</span>
        </td>
              `;

        table.appendChild(tableItem);
    }
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
                const values = {
                    amount: +INPUTS.cap.amount.value,
                    yearRate: +INPUTS.cap.yearRate.value,
                    period: +INPUTS.cap.period.value,
                }

                setTimeout(function () {
                    OUTPUTS.cap.table.innerHTML = "";

                    let profitObj = calcCapProfit(values.amount, values.yearRate, values.period);
                    let totalProfitObj = calcCapProfitSum(profitObj.monthlyAmount, profitObj.monthlyProfit, values.amount, pdvFee);
                    let totalProfitArr = Object.entries(totalProfitObj);

                    createPaymentTable(OUTPUTS.cap.table, TABLE_ITEM_TITLES.month, profitObj.monthlyAmount, profitObj.monthlyProfit);
                    createPaymentTable(OUTPUTS.cap.table, TABLE_ITEM_TITLES.totalProfit, totalProfitArr[2], totalProfitArr[0]);
                    createPaymentTable(OUTPUTS.cap.table, TABLE_ITEM_TITLES.feeProfit, totalProfitArr[3], totalProfitArr[1]);
                }, delay);
            }
        });
    }
}

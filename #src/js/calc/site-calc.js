// * Write "monthly" everywhere to avoid confusion, struct - structure

import { COMMON_VALUES } from "../common/values";
import { COMMON_COND } from "../common/conditions";
import { multNumPercent, sumNodeListValues, multNodeListValues, outputResult } from "../common/func";

// * SITE INPUTS with all costs
const SITE_INPUTS = {
    all: document.querySelectorAll(".inp"),
    labour: {
        all: document.querySelectorAll(".step1"),
    },
    salary: {
        fund: document.getElementById("salary-fund"),
        profitPercent: document.getElementById("profit-level-percent"),
    },
    material: {
        paperCount: document.getElementById("paper-count"),
        onePaperPrice: document.getElementById("one-paper-price"),
        domainYearPrice: document.getElementById("domain-year-price"),
        domainYearCount: document.getElementById("domain-year-count"),
        hostingMonthlyPrice: document.getElementById("hosting-monthly-price"),
        hostingMonthlyCount: document.getElementById("hosting-monthly-count"),
        flashDrivePrice: document.getElementById("flash-drive-price"),
    },
    electricity: {
        all: document.querySelectorAll(".step4"),
    },
}

// * COST OUTPUTS with outputs for result and costs
// * productionsExp - productionExpences (Загальновиробничі витрати)
// * nonproduction - (Позавиробничі витрати)
// * productionSale - (Виробнича собівартість)
// * total - (Повна собівартість)

const SITE_OUTPUTS = {
    cost: {
        basicSalary: document.getElementById("basic-salary-output"),
        additionalSalary: document.getElementById("additional-salary-output"),
        socialPayment: document.getElementById("social-payment-output"),

        material: document.getElementById("material-cost-output"),
        electricity: document.getElementById("electricity-cost-output"),
        equipment: document.getElementById("equipment-cost-output"),
        productionExp: document.getElementById("production-cost-output"),
    },
    fullCost: {
        productionSale: document.getElementById("production-cost-sale-output"),
        nonProduction: document.getElementById("non-production-cost-output"),
        total: document.getElementById("total-cost-output"),
    },
    costStruct: {
        basicSalary: document.getElementById("basic-salary-struct"),
        additionalSalary: document.getElementById("additional-salary-struct"),
        socialPayment: document.getElementById("social-payment-struct"),

        material: document.getElementById("material-cost-struct"),
        electricity: document.getElementById("electricity-cost-struct"),
        equipment: document.getElementById("equipment-cost-struct"),
        productionExp: document.getElementById("production-cost-struct"),
    },
    fullCostStruct: {
        productionSale: document.getElementById("production-cost-sale-struct"),
        nonProduction: document.getElementById("non-production-cost-struct"),
        total: document.getElementById("total-cost-struct"),
    },
    profit: {
        total: document.getElementById("profit-output"),
        wholeSalePrice: document.getElementById("wholesale-price-output"),
        pdvTax: document.getElementById("pdv-tax-output"),
        totalSalePrice: document.getElementById("sale-price-output"),
    },
    profitStruct: {
        total: document.getElementById("profit-struct"),
        wholeSalePrice: document.getElementById("wholesale-price-struct"),
        pdvTax: document.getElementById("pdv-tax-struct"),
        totalSalePrice: document.getElementById("sale-price-struct"),
    },
}

const PERCENT_VALUES = {
    dayDuration: 8,
    monthlyDuration: 22,
    additionalSalary: 12,
    socialPayment: 22,
    equipment: 15,
    productionExp: 18,
    nonProduction: 0.5,
    pdvTax: 20,
};

// * RESULT OBJECT
// * Don't change order of properties! For avoid errors in output cycles.

const SITE_RESULTS = {
    temp: {
        labour: 0,
        hourlyPay: 0,
    },
    cost: {
        basicSalary: 0,
        additionalSalary: 0,
        socialPayment: 0,
        material: 0,
        electricity: 0,
        equipment: 0,
        productionExp: 0,
    },
    get getSumSalary() {
        return +(this.cost.basicSalary + this.cost.additionalSalary).toFixed(2);
    },
    fullCost: {
        productionSale: 0,
        nonProduction: 0,
        total: 0,
    },
    profit: {
        total: 0,
        wholeSalePrice: 0,
        pdvTax: 0,
        totalSalePrice: 0,
    },
    costStruct: [],
    fullCostStruct: [],
    profitStruct: [],
};


// * CALC STEP 1. Uses sumNodeListValues from func.js

// * CALC STEP 2
function calcSalary() {
    let salaryFund = +SITE_INPUTS.salary.fund.value;

    SITE_RESULTS.temp.hourlyPay = +(salaryFund / PERCENT_VALUES.monthlyDuration / PERCENT_VALUES.dayDuration).toFixed(2);
    SITE_RESULTS.cost.basicSalary = +(SITE_RESULTS.temp.labour * SITE_RESULTS.temp.hourlyPay).toFixed(2);
    SITE_RESULTS.cost.additionalSalary = multNumPercent(SITE_RESULTS.cost.basicSalary, PERCENT_VALUES.additionalSalary);

    SITE_RESULTS.cost.socialPayment = multNumPercent(SITE_RESULTS.getSumSalary, PERCENT_VALUES.socialPayment);
    SITE_RESULTS.cost.equipment = multNumPercent(SITE_RESULTS.cost.basicSalary, PERCENT_VALUES.equipment);
    SITE_RESULTS.cost.productionExp = multNumPercent(SITE_RESULTS.cost.basicSalary, PERCENT_VALUES.productionExp);
}

// * CALC STEP 3. Calc uses formules & input values from step 3
function calcMaterial(
    paperCount, onePaperPrice, domainYearPrice, domainYearCount, hostingMonthlyPrice, hostingMonthlyCount, flashDrivePrice
) {
    let inpValues = [];
    for (let i = 0; i < arguments.length; i++) {
        inpValues[i] = +arguments[i].value;
    }

    let result = +((inpValues[0] * inpValues[1]) + (inpValues[2] * inpValues[3]) + (inpValues[4] * inpValues[5]) + inpValues[6]).toFixed(2);
    return result;
}

// * CALC STEP 4. Uses multNodeListValues from func.js

// * Sum values from SITE_RESULTS.cost
function calcProductionSale(resultObj) {
    let resultArr = Object.values(resultObj);
    let result = 0;

    for (let i = 0; i < resultArr.length; i++) {
        result += +resultArr[i];
    }
    return +result.toFixed(2);
}

// * Calc & output structure values in empty array
function calcStructPercent(resultObj, totalNum, outputArr) {
    let resultArr = Object.values(resultObj);
    let temp = 0;

    for (let i = 0; i < resultArr.length; i++) {
        temp = +((resultArr[i] / totalNum) * 100).toFixed(2);
        outputArr[i] = temp;
    }
    return outputArr;
}


// * OUTPUT

if (SITE_INPUTS.all) {
    let allFormInpArr = [...SITE_INPUTS.all];

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of allFormInpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(allFormInpArr)) {
                SITE_RESULTS.temp.labour = sumNodeListValues(SITE_INPUTS.labour.all);
                calcSalary();

                SITE_RESULTS.cost.material = calcMaterial(
                    SITE_INPUTS.material.paperCount,
                    SITE_INPUTS.material.onePaperPrice,
                    SITE_INPUTS.material.domainYearPrice,
                    SITE_INPUTS.material.domainYearCount,
                    SITE_INPUTS.material.hostingMonthlyPrice,
                    SITE_INPUTS.material.hostingMonthlyCount,
                    SITE_INPUTS.material.flashDrivePrice
                );
                SITE_RESULTS.cost.electricity = multNodeListValues(SITE_INPUTS.electricity.all);

                SITE_RESULTS.fullCost.productionSale = calcProductionSale(SITE_RESULTS.cost);
                SITE_RESULTS.fullCost.nonProduction = multNumPercent(SITE_RESULTS.fullCost.productionSale, PERCENT_VALUES.nonProduction);
                SITE_RESULTS.fullCost.total = +(SITE_RESULTS.fullCost.productionSale + SITE_RESULTS.fullCost.nonProduction).toFixed(2);

                // * PROFIT 
                SITE_RESULTS.profit.total = multNumPercent(SITE_RESULTS.fullCost.total, SITE_INPUTS.salary.profitPercent.value);
                SITE_RESULTS.profit.wholeSalePrice = +(SITE_RESULTS.fullCost.total + SITE_RESULTS.profit.total).toFixed(2);
                SITE_RESULTS.profit.pdvTax = multNumPercent(SITE_RESULTS.profit.wholeSalePrice, PERCENT_VALUES.pdvTax);
                SITE_RESULTS.profit.totalSalePrice = +(SITE_RESULTS.profit.wholeSalePrice + SITE_RESULTS.profit.pdvTax).toFixed(2);

                // * STRUCTURE EXPENCES
                let costStructResult = calcStructPercent(
                    SITE_RESULTS.cost,
                    SITE_RESULTS.fullCost.total,
                    SITE_RESULTS.costStruct
                );
                let fullCostStructResult = calcStructPercent(
                    SITE_RESULTS.fullCost,
                    SITE_RESULTS.fullCost.total,
                    SITE_RESULTS.fullCostStruct
                );
                let profitStructResult = calcStructPercent(
                    SITE_RESULTS.profit,
                    SITE_RESULTS.profit.totalSalePrice,
                    SITE_RESULTS.profitStruct
                );

                // * OUTPUT
                outputResult(SITE_RESULTS.cost, SITE_OUTPUTS.cost);
                outputResult(SITE_RESULTS.fullCost, SITE_OUTPUTS.fullCost);
                outputResult(SITE_RESULTS.profit, SITE_OUTPUTS.profit);
                outputResult(costStructResult, SITE_OUTPUTS.costStruct);
                outputResult(fullCostStructResult, SITE_OUTPUTS.fullCostStruct);
                outputResult(profitStructResult, SITE_OUTPUTS.profitStruct)
            }
        });
    }
}

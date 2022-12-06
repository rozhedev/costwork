// * Write "monthly" everywhere to avoid confusion, struct - structure
// * Don't change order of properties in objects! For avoid errors in output cycles.

import { COMMON_VALUES } from "../common/values";
import { COMMON_COND } from "../common/conditions";
import { outputResult } from "../common/output";


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
        pcСount: document.getElementById("pc-count"),
        pcWorkDuration: document.getElementById("pc-work-duration"),
        pcPower: document.getElementById("pc-power"),
        oneWattPrice: document.getElementById("one-watt-price"),
    },
}

// * COST OUTPUTS with outputs for result and costs
const SITE_OUTPUTS = {
    cost: {
        basicSalary: document.getElementById("basic-salary-output"),
        additionalSalary: document.getElementById("additional-salary-output"),
        socialPayment: document.getElementById("social-payment-output"),

        material: document.getElementById("material-cost-output"),
        electricity: document.getElementById("electricity-cost-output"),
        equipment: document.getElementById("equipment-cost-output"),

        production: document.getElementById("production-cost-output"),
        productionSale: document.getElementById("production-cost-sale-output"),
        nonProduction: document.getElementById("non-production-cost-output"),
        total: document.getElementById("total-cost-output"),
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

        production: document.getElementById("production-cost-struct"),
        material: document.getElementById("material-cost-struct"),
        electricity: document.getElementById("electricity-cost-struct"),
        equipment: document.getElementById("equipment-cost-struct"),
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
    production: 18,
    nonProduction: 0.5,
    pdvTax: 20,
};

// * RESULT OBJECT

const SITE_RESULTS = {
    temp: {
        labour: 0,
        hourlyPay: 0,
    },
    cost: {
        basicSalary: 0,
        additionalSalary: 0,
        sumSalary: 0,
        socialPayment: 0,
        equipment: 0,
        production: 0,
        material: 0,
        electricity: 0,
    },
    fullCost: {
        productionSale: 0,
        nonProduction: 0,
        total: 0,
    },
    costStruct: {
        basicSalary: 0,
        additionalSalary: 0,
        socialPayment: 0,
        equipment: 0,
        production: 0,
        material: 0,
        electricity: 0,
    },
    fullCostStruct: {
        productionSale: 0,
        nonProduction: 0,
        total: 0,
    },
    profit: {
        total: 0,
        wholeSalePrice: 0,
        pdvTaxAmount: 0,
        totalSalePrice: 0,
    },
    profitStruct: {
        total: 0,
        wholeSalePrice: 0,
        pdvTaxAmount: 0,
        totalSalePrice: 0,
    },
};


// * CALC STEP 1

function calcLabour(inpList) {
    let inpArr = [...inpList];
    let result = 0;
    for (let inpItem of inpArr) {
        result += +inpItem.value;
    }
    result = +result.toFixed(2);
    return result;
}

// * CALC STEP 2

function multPercent(num, percent) {
    return +(num * (percent / 100)).toFixed(2);
}

function calcSalary() {
    let salaryFund = +SITE_INPUTS.salary.fund.value;

    SITE_RESULTS.temp.hourlyPay = +(salaryFund / PERCENT_VALUES.monthlyDuration / PERCENT_VALUES.dayDuration).toFixed(2);
    SITE_RESULTS.cost.basicSalary = +(SITE_RESULTS.temp.labour * SITE_RESULTS.temp.hourlyPay).toFixed(2);
    SITE_RESULTS.cost.additionalSalary = multPercent(SITE_RESULTS.cost.basicSalary, PERCENT_VALUES.additionalSalary);
    SITE_RESULTS.cost.sumSalary = +(SITE_RESULTS.cost.basicSalary + SITE_RESULTS.cost.additionalSalary).toFixed(2);

    SITE_RESULTS.cost.socialPayment = multPercent(SITE_RESULTS.cost.sumSalary, PERCENT_VALUES.socialPayment);
    SITE_RESULTS.cost.equipment = multPercent(SITE_RESULTS.cost.basicSalary, PERCENT_VALUES.equipment);
    SITE_RESULTS.cost.production = multPercent(SITE_RESULTS.cost.basicSalary, PERCENT_VALUES.production);
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

// * CALC STEP 4. Multiple of input values from step 4

function calcElectricity(pcСount, pcWorkDuration, pcPower, oneWattPrice) {

    let result = 1;
    let inpValue;
    for (let i = 0; i < arguments.length; i++) {
        inpValue = +arguments[i].value;
        result *= inpValue;
        
    }
    return +result.toFixed(2);
}

function calcStructPercent(num, totalNum) {
    return +((num / totalNum) * 100).toFixed(2);
}

// * Sum of previous values from SITE_RESULTS.cost

function calcProductionSale(resultObj) {
    let resultArr = Object.values(resultObj);
    let result = 0;

    for (let i = 0; i < resultArr.length; i++) { 
        result += +resultArr[i];
    }
    return +result.toFixed(2);
}

// * OUTPUT EXPENCES & PROFIT

function outputCost() {
    SITE_OUTPUTS.cost.basicSalary.textContent = SITE_RESULTS.cost.basicSalary;
    SITE_OUTPUTS.cost.additionalSalary.textContent = SITE_RESULTS.cost.additionalSalary;
    SITE_OUTPUTS.cost.socialPayment.textContent = SITE_RESULTS.cost.socialPayment;

    SITE_OUTPUTS.cost.equipment.textContent = SITE_RESULTS.cost.equipment;
    SITE_OUTPUTS.cost.production.textContent = SITE_RESULTS.cost.production;
    SITE_OUTPUTS.cost.material.textContent = SITE_RESULTS.cost.material;
    SITE_OUTPUTS.cost.electricity.textContent = SITE_RESULTS.cost.electricity;

    SITE_OUTPUTS.fullCost.productionSale.textContent = SITE_RESULTS.fullCost.productionSale;
    SITE_OUTPUTS.fullCost.nonProduction.textContent = SITE_RESULTS.fullCost.nonProduction;
    SITE_OUTPUTS.fullCost.total.textContent = SITE_RESULTS.fullCost.total;
}

function outputCostStruct() {
    SITE_OUTPUTS.costStruct.basicSalary.textContent = SITE_RESULTS.costStruct.basicSalary;
    SITE_OUTPUTS.costStruct.additionalSalary.textContent = SITE_RESULTS.costStruct.additionalSalary;
    SITE_OUTPUTS.costStruct.socialPayment.textContent = SITE_RESULTS.costStruct.socialPayment;

    SITE_OUTPUTS.costStruct.equipment.textContent = SITE_RESULTS.costStruct.equipment;
    SITE_OUTPUTS.costStruct.production.textContent = SITE_RESULTS.costStruct.production;
    SITE_OUTPUTS.costStruct.material.textContent = SITE_RESULTS.costStruct.material;
    SITE_OUTPUTS.costStruct.electricity.textContent = SITE_RESULTS.costStruct.electricity;

    SITE_OUTPUTS.fullCostStruct.productionSale.textContent = SITE_RESULTS.fullCostStruct.productionSale;
    SITE_OUTPUTS.fullCostStruct.nonProduction.textContent = SITE_RESULTS.fullCostStruct.nonProduction;
    SITE_OUTPUTS.fullCostStruct.total.textContent = SITE_RESULTS.fullCostStruct.total;
}

function outputProfit() {
    SITE_OUTPUTS.profit.total.textContent = SITE_RESULTS.profit.total;
    SITE_OUTPUTS.profit.wholeSalePrice.textContent = SITE_RESULTS.profit.wholeSalePrice;
    SITE_OUTPUTS.profit.pdvTax.textContent = SITE_RESULTS.profit.pdvTaxAmount;
    SITE_OUTPUTS.profit.totalSalePrice.textContent = SITE_RESULTS.profit.totalSalePrice;
}

function outputProfitStruct() {
    SITE_OUTPUTS.profitStruct.total.textContent = SITE_RESULTS.profitStruct.total;
    SITE_OUTPUTS.profitStruct.wholeSalePrice.textContent = SITE_RESULTS.profitStruct.wholeSalePrice;
    SITE_OUTPUTS.profitStruct.pdvTax.textContent = SITE_RESULTS.profitStruct.pdvTaxAmount;
    SITE_OUTPUTS.profitStruct.totalSalePrice.textContent = SITE_RESULTS.profitStruct.totalSalePrice;
}

// * CALL FUNCTIONS

if (SITE_INPUTS.all) {
    let allFormInpArr = [...SITE_INPUTS.all];

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of allFormInpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(allFormInpArr)) {
                SITE_RESULTS.temp.labour = calcLabour(SITE_INPUTS.labour.all);
                calcSalary();

                SITE_RESULTS.cost.material = calcMaterial(SITE_INPUTS.material.paperCount, SITE_INPUTS.material.onePaperPrice, SITE_INPUTS.material.domainYearPrice, SITE_INPUTS.material.domainYearCount, SITE_INPUTS.material.hostingMonthlyPrice, SITE_INPUTS.material.hostingMonthlyCount, SITE_INPUTS.material.flashDrivePrice);

                SITE_RESULTS.cost.electricity = calcElectricity(SITE_INPUTS.electricity.pcСount, SITE_INPUTS.electricity.pcWorkDuration, SITE_INPUTS.electricity.pcPower, SITE_INPUTS.electricity.oneWattPrice);

                SITE_RESULTS.fullCost.productionSale = calcProductionSale(SITE_RESULTS.cost);

                SITE_RESULTS.fullCost.nonProduction = multPercent(SITE_RESULTS.fullCost.productionSale, PERCENT_VALUES.nonProduction);
                SITE_RESULTS.fullCost.total = +(SITE_RESULTS.fullCost.productionSale + SITE_RESULTS.fullCost.nonProduction).toFixed(2);

                // * STRUCTURE EXPENCES
                SITE_RESULTS.costStruct.basicSalary = calcStructPercent(SITE_RESULTS.cost.basicSalary, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.costStruct.additionalSalary = calcStructPercent(SITE_RESULTS.cost.additionalSalary, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.costStruct.socialPayment = calcStructPercent(SITE_RESULTS.cost.socialPayment, SITE_RESULTS.fullCost.total);

                SITE_RESULTS.costStruct.equipment = calcStructPercent(SITE_RESULTS.cost.equipment, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.costStruct.production = calcStructPercent(SITE_RESULTS.cost.production, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.costStruct.material = calcStructPercent(SITE_RESULTS.cost.material, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.costStruct.electricity = calcStructPercent(SITE_RESULTS.cost.electricity, SITE_RESULTS.fullCost.total);

                SITE_RESULTS.fullCostStruct.productionSale = calcStructPercent(SITE_RESULTS.fullCost.productionSale, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.fullCostStruct.nonProduction = calcStructPercent(SITE_RESULTS.fullCost.nonProduction, SITE_RESULTS.fullCost.total);
                SITE_RESULTS.fullCostStruct.total = calcStructPercent(SITE_RESULTS.fullCost.total, SITE_RESULTS.fullCost.total);

                // * PROFIT
                SITE_RESULTS.profit.total = multPercent(SITE_RESULTS.fullCost.total, SITE_INPUTS.salary.profitPercent.value);
                SITE_RESULTS.profit.wholeSalePrice = +(SITE_RESULTS.fullCost.total + SITE_RESULTS.profit.total).toFixed(2);
                SITE_RESULTS.profit.pdvTaxAmount = multPercent(SITE_RESULTS.profit.wholeSalePrice, PERCENT_VALUES.pdvTax);
                SITE_RESULTS.profit.totalSalePrice = +(SITE_RESULTS.profit.wholeSalePrice + SITE_RESULTS.profit.pdvTaxAmount).toFixed(2);

                // * STRUCTURE PROFIT
                SITE_RESULTS.profitStruct.total = calcStructPercent(SITE_RESULTS.profit.total, SITE_RESULTS.profit.totalSalePrice);
                SITE_RESULTS.profitStruct.wholeSalePrice = calcStructPercent(SITE_RESULTS.profit.wholeSalePrice, SITE_RESULTS.profit.totalSalePrice);
                SITE_RESULTS.profitStruct.pdvTaxAmount = calcStructPercent(SITE_RESULTS.profit.pdvTaxAmount, SITE_RESULTS.profit.totalSalePrice);
                SITE_RESULTS.profitStruct.totalSalePrice = calcStructPercent(SITE_RESULTS.profit.totalSalePrice, SITE_RESULTS.profit.totalSalePrice);

                console.log(SITE_RESULTS);
                // * OUTPUT FUNC
                outputCost();
                outputCostStruct();
                outputProfit();
                outputProfitStruct();
            }
        });
    }
}

// * Write "monthly" everywhere to avoid confusion

import { COMMON_COND } from "../common/conditions";
import { outputResult } from "../common/output";

// const SITE_INPUTS = {
//     all: document.querySelectorAll(".inp"),
//     firstStep: {
//         all: document.querySelectorAll(".step1"),
//     },
// }

// * STEP 1
let allFormInp = document.querySelectorAll(".site-calc-inp");
let firstStepInputs = document.querySelectorAll(".step1");

// * STEP 2
let secondStepInputs = document.querySelectorAll(".step2");
const salaryFund = document.getElementById("salary-fund");
const profitLevelPercent = document.getElementById("profit-level-percent");

// * STEP 3
let thirtyStepInputs = document.querySelectorAll(".step3");
const paperCount = document.getElementById("paper-count");
const onePaperPrice = document.getElementById("one-paper-price");
const flashDrivePrice = document.getElementById("flash-drive-price");

const domainYearPrice = document.getElementById("domain-year-price");
const domainYearCount = document.getElementById("domain-year-count");
const hostingMonthlyPrice = document.getElementById("hosting-monthly-price");
const hostingMonthlyCount = document.getElementById("hosting-monthly-count");


// * STEP 4
let fourtyStepInputs = document.querySelectorAll(".step4");
const pcСount = document.getElementById("pc-count");
const pcWorkDuration = document.getElementById("pc-work-duration");
const pcPower = document.getElementById("pc-power");
const oneWattPrice = document.getElementById("one-watt-price");


// * EXPENCES OUTPUT
const expencesOutput = {
    basicSalary: document.getElementById("basic-salary-output"),
    additionalSalary: document.getElementById("additional-salary-output"),
    socialPayment: document.getElementById("social-payment-output"),

    materialExpences: document.getElementById("material-cost-output"),
    electricityExpences: document.getElementById("electricity-cost-output"),
    equipmentCost: document.getElementById("equipment-cost-output"),

    productionCost: document.getElementById("production-cost-output"),
    productionCostSale: document.getElementById("production-cost-sale-output"),
    nonProductionCost: document.getElementById("non-production-cost-output"),
    totalCost: document.getElementById("total-cost-output"),
};


// * EXPENCES STRUCTURE
const expencesStructOutput = {
    basicSalary: document.getElementById("basic-salary-struct"),
    additionalSalary: document.getElementById("additional-salary-struct"),
    socialPayment: document.getElementById("social-payment-struct"),

    materialExpences: document.getElementById("material-cost-struct"),
    electricityExpences: document.getElementById("electricity-cost-struct"),
    equipmentCost: document.getElementById("equipment-cost-struct"),

    productionCost: document.getElementById("production-cost-struct"),
    productionCostSale: document.getElementById("production-cost-sale-struct"),
    nonProductionCost: document.getElementById("non-production-cost-struct"),
    totalCost: document.getElementById("total-cost-struct"),
};


// * PROFIT EXPENCES
const profitOutput = {
    total: document.getElementById("profit-output"),
    wholeSalePrice: document.getElementById("wholesale-price-output"),
    pdvTax: document.getElementById("pdv-tax-output"),
    totalSalePrice: document.getElementById("sale-price-output"),
}


// * PROFIT STRUCTURE
const profitStructOutput = {
    total: document.getElementById("profit-struct"),
    wholeSalePrice: document.getElementById("wholesale-price-struct"),
    pdvTax: document.getElementById("pdv-tax-struct"),
    totalSalePrice: document.getElementById("sale-price-struct"),
}


// * RESULT OBJECTS

const percentValues = {
    workDayDuration: 8,
    workMonthlyDuration: 22,
    additionalSalary: 12,
    socialPayment: 22,
    equipmentCost: 15,
    productionCost: 18,
    nonProductionCost: 0.5,
    pdvTax: 20,
};

const tempResult = {
    labourCost: 0,
    hourlyPay: 0,
};

const expencesResult = {
    basicSalary: 0,
    additionalSalary: 0,
    sumSalary: 0,
    socialPayment: 0,
    equipmentCost: 0,
    productionCost: 0,
    materialExpences: 0,
    electricityExpences: 0,
    productionCostSale: 0,
    nonProductionCost: 0,
    totalCost: 0,
};

const expencesStruct = {
    basicSalary: 0,
    additionalSalary: 0,
    socialPayment: 0,
    equipmentCost: 0,
    productionCost: 0,
    materialExpences: 0,
    electricityExpences: 0,
    productionCostSale: 0,
    nonProductionCost: 0,
    totalCost: 0,
};

const profitResult = {
    total: 0,
    wholeSalePrice: 0,
    pdvTaxAmount: 0,
    totalSalePrice: 0,
};

const profitStruct = {
    total: 0,
    wholeSalePrice: 0,
    pdvTaxAmount: 0,
    totalSalePrice: 0,
};


// * CALC STEP 1

function calcLabourCost(inpList) {
    let inpArr = [...inpList];
    let result = 0;
    for (let inpItem of inpArr) {
        result += +inpItem.value;
    }
    return result;
}

// * CALC STEP 2

function calcPercentValue(num, percentValue) {
    return +(num * (percentValue / 100)).toFixed(2);
}

function calcSalary() {
    let salaryFundValue = +salaryFund.value;

    tempResult.hourlyPay = +(salaryFundValue / percentValues.workMonthlyDuration / percentValues.workDayDuration).toFixed(2);
    expencesResult.basicSalary = +(tempResult.labourCost * tempResult.hourlyPay).toFixed(2);
    expencesResult.additionalSalary = +(calcPercentValue(expencesResult.basicSalary, percentValues.additionalSalary)).toFixed(2);

    expencesResult.sumSalary = expencesResult.basicSalary + expencesResult.additionalSalary;
    expencesResult.socialPayment = +(calcPercentValue(expencesResult.sumSalary, percentValues.socialPayment)).toFixed(2);
    expencesResult.equipmentCost = +(calcPercentValue(expencesResult.basicSalary, percentValues.equipmentCost)).toFixed(2);
    expencesResult.productionCost = +(calcPercentValue(expencesResult.basicSalary, percentValues.productionCost)).toFixed(2);
}

// * CALC STEP 3

function calcMaterialExpences(
    paperCountValue, onePaperPriceValue, flashDrivePriceValue, domainYearPriceValue, domainYearCountValue, hostingMonthlyPriceValue, hostingMonthlyCountValue
) {

    paperCountValue = +paperCountValue.value;
    onePaperPriceValue = +onePaperPriceValue.value;
    flashDrivePriceValue = +flashDrivePriceValue.value;
    domainYearPriceValue = +domainYearPriceValue.value
    domainYearCountValue = +domainYearCountValue.value;
    hostingMonthlyPriceValue = +hostingMonthlyPriceValue.value;
    hostingMonthlyCountValue = +hostingMonthlyCountValue.value;

    let materialExpences = +((paperCountValue * onePaperPriceValue) + (domainYearPriceValue * domainYearCountValue) + (hostingMonthlyPriceValue * hostingMonthlyCountValue) + flashDrivePriceValue).toFixed(2);
    return materialExpences;
}

// * CALC STEP 4

function calcElectricityExpences(pcСountValue, pcWorkDurationValue, pcPowerValue, oneWattPriceValue) {
    pcСountValue = +pcСountValue.value;
    pcWorkDurationValue = +pcWorkDurationValue.value;
    pcPowerValue = +pcPowerValue.value;
    oneWattPriceValue = +oneWattPriceValue.value;

    let electricityExpences = +(pcСountValue * pcWorkDurationValue * pcPowerValue * oneWattPriceValue).toFixed(2);
    return electricityExpences;
}


// * OUTPUT EXPENCES & PROFIT

function calcStructurePercent(num, totalNum) {
    return +((num / totalNum) * 100).toFixed(2);
}

function outputAllExpences() {
    expencesOutput.basicSalary.textContent = expencesResult.basicSalary;
    expencesOutput.additionalSalary.textContent = expencesResult.additionalSalary;
    expencesOutput.socialPayment.textContent = expencesResult.socialPayment;

    expencesOutput.equipmentCost.textContent = expencesResult.equipmentCost;
    expencesOutput.productionCost.textContent = expencesResult.productionCost;
    expencesOutput.materialExpences.textContent = expencesResult.materialExpences;
    expencesOutput.electricityExpences.textContent = expencesResult.electricityExpences;

    expencesOutput.productionCostSale.textContent = expencesResult.productionCostSale;
    expencesOutput.nonProductionCost.textContent = expencesResult.nonProductionCost;
    expencesOutput.totalCost.textContent = expencesResult.totalCost;
}

function outputAllExpencesStruct() {
    expencesStructOutput.basicSalary.textContent = expencesStruct.basicSalary;
    expencesStructOutput.additionalSalary.textContent = expencesStruct.additionalSalary;
    expencesStructOutput.socialPayment.textContent = expencesStruct.socialPayment;

    expencesStructOutput.equipmentCost.textContent = expencesStruct.equipmentCost;
    expencesStructOutput.productionCost.textContent = expencesStruct.productionCost;
    expencesStructOutput.materialExpences.textContent = expencesStruct.materialExpences;
    expencesStructOutput.electricityExpences.textContent = expencesStruct.electricityExpences;

    expencesStructOutput.productionCostSale.textContent = expencesStruct.productionCostSale;
    expencesStructOutput.nonProductionCost.textContent = expencesStruct.nonProductionCost;
    expencesStructOutput.totalCost.textContent = expencesStruct.totalCost;
}

function outputAllProfit() {
    profitOutput.total.textContent = profitResult.total;
    profitOutput.wholeSalePrice.textContent = profitResult.wholeSalePrice;
    profitOutput.pdvTax.textContent = profitResult.pdvTaxAmount;
    profitOutput.totalSalePrice.textContent = profitResult.totalSalePrice;
}

function outputAllProfitStruct() {
    profitStructOutput.total.textContent = profitStruct.total;
    profitStructOutput.wholeSalePrice.textContent = profitStruct.wholeSalePrice;
    profitStructOutput.pdvTax.textContent = profitStruct.pdvTaxAmount;
    profitStructOutput.totalSalePrice.textContent = profitStruct.totalSalePrice;
}

// * CALL FUNCTIONS

if (allFormInp) {
    let allFormInpArr = [...allFormInp];

    // * ADD CHANGE EVENT FOR INPUTS
    for (const inpItem of allFormInpArr) {
        inpItem.addEventListener("change", function () {

            if (COMMON_COND.controllerClassCheck(allFormInpArr)) {
                tempResult.labourCost = calcLabourCost(firstStepInputs);
                calcSalary();

                expencesResult.materialExpences = calcMaterialExpences(paperCount, onePaperPrice, flashDrivePrice, domainYearPrice, domainYearCount, hostingMonthlyPrice, hostingMonthlyCount);

                expencesResult.electricityExpences = calcElectricityExpences(pcСount, pcWorkDuration, pcPower, oneWattPrice);

                expencesResult.productionCostSale = +(expencesResult.sumSalary + expencesResult.socialPayment + expencesResult.equipmentCost + expencesResult.productionCost + expencesResult.materialExpences + expencesResult.electricityExpences).toFixed(2);

                expencesResult.nonProductionCost = +(calcPercentValue(expencesResult.productionCostSale, percentValues.nonProductionCost)).toFixed(2);
                expencesResult.totalCost = +(expencesResult.productionCostSale + expencesResult.nonProductionCost).toFixed(2);
                console.log(tempResult);
                console.log(expencesResult);


                // * STRUCTURE EXPENCES
                expencesStruct.basicSalary = calcStructurePercent(expencesResult.basicSalary, expencesResult.totalCost);
                expencesStruct.additionalSalary = calcStructurePercent(expencesResult.additionalSalary, expencesResult.totalCost);
                expencesStruct.socialPayment = calcStructurePercent(expencesResult.socialPayment, expencesResult.totalCost);

                expencesStruct.equipmentCost = calcStructurePercent(expencesResult.equipmentCost, expencesResult.totalCost);
                expencesStruct.productionCost = calcStructurePercent(expencesResult.productionCost, expencesResult.totalCost);
                expencesStruct.materialExpences = calcStructurePercent(expencesResult.materialExpences, expencesResult.totalCost);
                expencesStruct.electricityExpences = calcStructurePercent(expencesResult.electricityExpences, expencesResult.totalCost);

                expencesStruct.productionCostSale = calcStructurePercent(expencesResult.productionCostSale, expencesResult.totalCost);
                expencesStruct.nonProductionCost = calcStructurePercent(expencesResult.nonProductionCost, expencesResult.totalCost);
                expencesStruct.totalCost = calcStructurePercent(expencesResult.totalCost, expencesResult.totalCost);

                // * PROFIT
                profitResult.total = +(calcPercentValue(expencesResult.totalCost, profitLevelPercent.value)).toFixed(2);
                profitResult.wholeSalePrice = +(expencesResult.totalCost + profitResult.total).toFixed(2);
                profitResult.pdvTaxAmount = +(calcPercentValue(profitResult.wholeSalePrice, percentValues.pdvTax)).toFixed(2);
                profitResult.totalSalePrice = +(profitResult.wholeSalePrice + profitResult.pdvTaxAmount).toFixed(2);

                // * STRUCTURE PROFIT
                profitStruct.total = calcStructurePercent(profitResult.total, profitResult.totalSalePrice);
                profitStruct.wholeSalePrice = calcStructurePercent(profitResult.wholeSalePrice, profitResult.totalSalePrice);
                profitStruct.pdvTaxAmount = calcStructurePercent(profitResult.pdvTaxAmount, profitResult.totalSalePrice);
                profitStruct.totalSalePrice = calcStructurePercent(profitResult.totalSalePrice, profitResult.totalSalePrice);

                // * OUTPUT FUNC
                outputAllExpences();
                outputAllExpencesStruct();
                outputAllProfit();
                outputAllProfitStruct();
            }
        });
    }
}

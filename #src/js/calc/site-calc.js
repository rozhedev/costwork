// * STEP 1
const allFormInp = document.querySelectorAll(".inp");
const firstStepInputs = document.querySelectorAll(".step1");

// * STEP 2
const secondStepInputs = document.querySelectorAll(".step2");
const pdvTaxPercent = document.getElementById("pdv-tax-percent");
const profitabilityLevelPercent = document.getElementById("profitability-level-percent");

// * STEP 3
const thirtyStepInputs = document.querySelectorAll(".step3");
const paperCount = document.getElementById("paper-count");
const onePaperPrice = document.getElementById("one-paper-price");
const flashDrivePrice = document.getElementById("flash-drive-price");
const domainYearPrice = document.getElementById("domain-year-price");
const domainYearCount = document.getElementById("domain-year-count");
const hostingMonthPrice = document.getElementById("hosting-month-price");
const hostingMounthCount = document.getElementById("hosting-mounth-count");

// * STEP 4
const fourtyStepInputs = document.querySelectorAll(".step4");
const pcСount = document.getElementById("pc-count");
const pcWorkDuration = document.getElementById("pc-work-duration");
const pcPower = document.getElementById("pc-power");
const oneWattPrice = document.getElementById("one-watt-price");

// * EXPENCES OUTPUT
const materialCostOutput = document.getElementById("material-cost-output");
const electricityCostOutput = document.getElementById("electricity-cost-output");
const basicSalaryOutput = document.getElementById("basic-salary-output");
const additionalSalaryOutput = document.getElementById("additional-salary-output");
const socialPaymentOutput = document.getElementById("social-payment-output");
const equipmentCostOutput = document.getElementById("equipment-cost-output");
const productionCostOutput = document.getElementById("production-cost-output");
const productionCostSaleOutput = document.getElementById("production-cost-sale-output");
const nonProductionCostOutput = document.getElementById("non-production-cost-output");
const totalCostOutput = document.getElementById("total-cost-output");

// * EXPENCES STRUCTURE
const materialCostStruct = document.getElementById("material-cost-struct");
const electricityCostStruct = document.getElementById("electricity-cost-struct");
const basicSalaryStruct = document.getElementById("basic-salary-struct");
const additionalSalaryStruct = document.getElementById("additional-salary-struct");
const socialPaymentStruct = document.getElementById("social-payment-struct");
const equipmentCostStruct = document.getElementById("equipment-cost-struct");
const productionCostStruct = document.getElementById("production-cost-struct");
const productionCostSaleStruct = document.getElementById("production-cost-sale-struct");
const nonProductionCostStruct = document.getElementById("non-production-cost-struct");
const totalCostStruct = document.getElementById("total-cost-struct");

// * PROFIT EXPENCES
const profitOutput = document.getElementById("profit-output");
const wholesalePriceOutput = document.getElementById("wholesale-price-output");
const pdvTaxOutput = document.getElementById("pdv-tax-output");
const salePriceOutput = document.getElementById("sale-price-output");

// * PROFIT STRUCTURE
const profitStruct = document.getElementById("profit-struct");
const wholesalePriceStruct = document.getElementById("wholesale-price-struct");
const pdvTaxStruct = document.getElementById("pdv-tax-struct");
const salePriceStruct = document.getElementById("sale-price-struct");

// * RESULT OBJECTS
const tempResult = {};
const expencesResult = {};
const expencesStructure = {};
const profitResult = {};
const profitsStructure = {};
let delay = 1000;


// * CALC STEP 1

function calcMaterialExpences(paperCountValue, onePaperPriceValue, domainYearPriceValue, domainYearCountValue, hostingMonthPriceValue, hostingMounthCountValue) {

    paperCountValue = +paperCountValue.value;
    onePaperPriceValue = +onePaperPriceValue.value;
    domainYearPriceValue = +domainYearPriceValue.value
    domainYearCountValue = +domainYearCountValue.value;
    hostingMonthPriceValue = +hostingMonthPriceValue.value;
    hostingMounthCountValue = +hostingMounthCountValue.value;

    return materialExpences = (paperCountValue * onePaperPriceValue) + (domainYearPriceValue * domainYearCountValue) + (hostingMonthPriceValue * hostingMounthCountValue);
}

// * По изменению шаговых инпутов (.step1 .step2 ...) будут изменятся значения. По изменению всех инпутов будет менятся структура.

for (inpItem of firstStepInputs) {
    inpItem.addEventListener("change", function () {

        expencesResult.materialExpences = calcMaterialExpences(paperCount, onePaperPrice, domainYearPrice, domainYearCount, hostingMonthPrice, hostingMounthCount);
    });
}



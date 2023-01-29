## Як працює калькулятор по розрахунку вартості вебсайту 

(Как работает калькулятор по расчёту вебсайта)

#### Трудовитрати
```
laborCost = Сума всіх полів на 1 кроці
```

#### Годинна тарифна ставка
```
const workDaysCount = 22;
const workDaysDuration = 8;

hourlyPay = salaryFund / workDaysCount / workDaysDuration
```

#### Основна зарплата
```
basicSalary = laborCost * hourlyPay
```

#### Додаткова зарплата
```
additionalSalary = basicSalary * (additionalSalary / 100)
sumSalary = basicSalary + additionalSalary
```

#### Єдиний соціальний внесок
```
socialPayment = sumSalary * (socialPaymentPercent / 100)
```

#### Витрати на утрим. обладнання
```
equipmentCost = sumSalary * (equipmentCostPercent / 100)
```

#### Загальновиробничі витрати
```
productionCost = (sumSalary + equipmentCost) * (productionCostPercent / 100)
```

#### Матеріальні витрати
```
materialCost = (paperCount * onePaperPrice) + flashDrivePrice + (domainYearPrice * domainYearCount) + (hostingMonthPrice * hostingMounthCount)
```

#### Витр. на електроенергію
```
electricityCost = (pcWorkDuration * pcPower * oneWattPrice) * pcCount
```

#### Виробнича собівартість
```
productionCostSale = materialCost + electricityCost + sumSalary + socialPayment + equipmentCost + productionCost
```

#### Позавиробничі витрати
```
nonProductionCost = productionCostSale * (nonProductionCostPercent / 100)
```

#### Повна собівартість
```
totalCost = productionCostSale + nonProductionCost
```
_____________________________________________________________________

### Розрахунок доходу

#### Прибуток від реалізації продукції 
```
totalProfit = totalCost * (profitabilityLevelPercent / 100)
```

#### Оптова ціна
```
wholesalePrice = totalCost + totalProfit
```

#### Сума ПДВ
```
pdvTaxAmount = wholesalePrice * (pdvTaxPercent / 100)
```

#### Відпускна ціна
```
totalSalePrice = wholesalePrice + pdvTaxAmount
```
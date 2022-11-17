
export function createPaymentTable(table, title, profitValuesArr, feeValuesArr) {
    const selectedCur = document.querySelector(".select_header-select .select__title span");
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
            <span class="navlink">
                ${profitValuesArr[i]}
            </span>
            <span class="navlink currency">
                ${selectedCur.textContent}
            </span>
        </td>
        <td class="payment-table__item-value">
            <span class="navlink">
                ${feeValuesArr[i]}
            </span>
            <span class="navlink currency">
                ${selectedCur.textContent}
            </span>
        </td>
              `;

        table.appendChild(tableItem);
    }
}
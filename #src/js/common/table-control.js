
export function getTableSlice(tableId, showBtn, hideBtn) {
    const tableItems = document.querySelectorAll(`#${tableId} .payment-table__item`);
    let tableItemsArr, tableSlice;
    let maxItemsNum = 10;

    if (tableItems.length > maxItemsNum) {     
        tableItemsArr = [...tableItems];
        tableSlice = tableItemsArr.slice(maxItemsNum);

        for (let i = maxItemsNum; i < tableItems.length; i++) {
            // * Don't work via classList.add()
            tableItems[i].className = "payment-table__item _hide";
        }
        showBtn.removeAttribute("disabled");
        hideBtn.setAttribute("disabled", "");

    } else if (tableItems.length <= maxItemsNum) {
        showBtn.setAttribute("disabled", "");
        hideBtn.setAttribute("disabled", "");
    }   
    return tableSlice;
}

export function toggleTableItems(tableSlice, stateShow, stateHide, showBtn, hideBtn) {
    for (let i = 0; i < tableSlice.length; i++) {
        tableSlice[i].classList.add(stateShow);
        tableSlice[i].classList.remove(stateHide);
    }
    showBtn.setAttribute("disabled", "");
    hideBtn.removeAttribute("disabled");
}
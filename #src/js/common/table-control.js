
export function getTableSlice(tableId, stateShow, stateHide, showBtn, hideBtn) {
    const tableItems = document.querySelectorAll(`#${tableId} .payment-table__item`);
    let tableItemsArr, tableSlice;
    let maxItemsNum = 10;

    if (tableItems.length > maxItemsNum) {     
        tableItemsArr = [...tableItems];
        tableSlice = tableItemsArr.slice(maxItemsNum);

        for (let i = maxItemsNum; i < tableItems.length; i++) {
            tableItems[i].classList.add(stateHide);
            tableItems[i].classList.remove(stateShow);
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
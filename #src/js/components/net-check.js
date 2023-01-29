import { checkConnect } from "../common/checkers";
import { API_LINK } from "../data/config";
import { popupNet, COMMON_VALUES } from "../data/values";

setInterval(() => {
    checkConnect(API_LINK, popupNet);
}, COMMON_VALUES.checkConInterval);
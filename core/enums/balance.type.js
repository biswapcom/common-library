"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceType = exports.BalanceAction = void 0;
var BalanceAction;
(function (BalanceAction) {
    BalanceAction["Increase"] = "increase";
    BalanceAction["Decrease"] = "decrease";
})(BalanceAction = exports.BalanceAction || (exports.BalanceAction = {}));
var BalanceType;
(function (BalanceType) {
    BalanceType["Swap"] = "swap";
    BalanceType["V3Swap"] = "v3Swap";
    BalanceType["Farm"] = "farm";
    BalanceType["Pool"] = "pool";
    BalanceType["Competition"] = "competition";
    BalanceType["FeeReturn"] = "fee-return";
    BalanceType["Squid"] = "squid";
    BalanceType["DivPool"] = "div-pool";
})(BalanceType = exports.BalanceType || (exports.BalanceType = {}));

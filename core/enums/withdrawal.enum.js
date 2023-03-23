"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalType = exports.WithdrawalStatus = void 0;
var WithdrawalStatus;
(function (WithdrawalStatus) {
    WithdrawalStatus[WithdrawalStatus["Moderation"] = -3] = "Moderation";
    WithdrawalStatus[WithdrawalStatus["Canceled"] = -2] = "Canceled";
    WithdrawalStatus[WithdrawalStatus["Error"] = -1] = "Error";
    WithdrawalStatus[WithdrawalStatus["Pending"] = 0] = "Pending";
    WithdrawalStatus[WithdrawalStatus["Approved"] = 1] = "Approved";
    WithdrawalStatus[WithdrawalStatus["Done"] = 2] = "Done";
    WithdrawalStatus[WithdrawalStatus["Repay"] = 3] = "Repay"; // this status only to show that is re-payed transactions. This status should not be written to the database
})(WithdrawalStatus = exports.WithdrawalStatus || (exports.WithdrawalStatus = {}));
var WithdrawalType;
(function (WithdrawalType) {
    WithdrawalType["Competition"] = "competition";
    WithdrawalType["DividendPool"] = "divPool";
    WithdrawalType["Farm"] = "farm";
    WithdrawalType["Pool"] = "pool";
    WithdrawalType["Swap"] = "swap";
    WithdrawalType["V3Swap"] = "v3Swap";
    // R.I.P. types
    WithdrawalType["Distribution"] = "distribution";
    WithdrawalType["Squid"] = "squid";
    WithdrawalType["Lottery"] = "lottery";
})(WithdrawalType = exports.WithdrawalType || (exports.WithdrawalType = {}));

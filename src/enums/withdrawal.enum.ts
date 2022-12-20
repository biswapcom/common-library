export enum WithdrawalStatus {
    Moderation = -3,
    Canceled = -2,  // not payed tab
    Error = -1,
    Pending = 0,
    Approved = 1,
    Done = 2,
    Repay = 3 // this status only to show that is re-payed transactions. This status should not be written to the database
}

export enum WithdrawalType {
    Pool = 'pool',
    Competition = 'competition',
    Farm = 'farm',
    Swap = 'swap',
    Distribution = 'distribution',

    // R.I.P. types
    Squid = 'squid',
    Lottery = 'lottery',
}

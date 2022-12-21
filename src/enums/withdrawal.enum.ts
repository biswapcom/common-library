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
    Competition = 'competition',
    DividendPool = 'divPool',
    Farm = 'farm',
    Pool = 'pool',
    Swap = 'swap',

    // R.I.P. types
    Distribution = 'distribution',
    Squid = 'squid',
    Lottery = 'lottery',
}

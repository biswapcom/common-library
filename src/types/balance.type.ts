import { BalanceAction, BalanceType, ProjectName } from "@enums";

export interface BalanceMessage {
    userId: string;
    type: BalanceType,
    action: BalanceAction,
    project: ProjectName,
    amount: string;

    /**
     * Hash of the transaction in which the balance changed
     */
    txHash?: string;

    /**
     * Token symbol for div-pool
     */
    token?: string;
}
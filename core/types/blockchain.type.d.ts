import { ObjectId } from "bson";
export declare type AddressMap = {
    [chainId: number]: string;
};
export declare type TokenMap = {
    [chainId: number]: {
        address: string;
        symbol: string;
        name: string;
        core: boolean;
    };
};
export declare type Web3Map = {
    [chainId: number]: {
        httpHosts: string[];
    };
};
export declare type MulticallCall = {
    /**
     * Address of the contract on which the method will be called
     */
    address: string;
    /**
     * The name of the method to call
     */
    name: string;
    /**
     * Method parameters
     */
    params: any[];
};
export declare type ContractDb = {
    _id?: ObjectId;
    chainId: number;
    name: string;
    type: string;
    address: string;
    isAffected: boolean;
    abi: string;
    description: string;
    token: string;
};

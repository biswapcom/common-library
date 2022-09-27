export enum ContractType {
    Common = 'common', // abi (pair, erc20 etc)
    Single = 'single', // abi + address
    DoublePool = 'double-pool', // abi + address + stake token
}
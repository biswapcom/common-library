export enum ChainId {
    AVALANCHE = 43114,
    BSC = 56,
    BSC_TESTNET = 97,
    ETHEREUM = 1,
    FANTOM = 250,
    FANTOM_TESTNET = 4002,
    POLYGON = 137, // matic
    POLYGON_TESTNET = 80001
}

export enum ContractType {
    Default = 'default', // abi without address (pair, erc20 etc)
    Single = 'single', // abi + address
    DoublePool = 'double-pool', // abi + address + stake token
}
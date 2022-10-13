export type AddressMap = {
    [chainId: number]: string;
}

export type TokenMap = {
    [chainId: number]: {
        address: string;
        symbol: string;
        name: string;
        core: boolean;
    }
}

export type Web3Map = {
    [chainId: number]: {
        httpHosts: string[];
    }
};

export type MulticallCall = {
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
    params: any[]
}
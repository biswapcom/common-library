import { blockchainService } from "@services";

export * as constants from "@constants";
export * as enums from "@enums";
export * as services from "@services";
export * as types from "@types";


const x = async () => {
    console.log('LOG: ', 'sss');
    const w3 = blockchainService.getWeb3()

    const t = await w3.eth.getBlock(22282948, true)

    console.log('LOG: ', t);
}

x();

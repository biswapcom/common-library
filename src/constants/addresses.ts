import { AddressMap } from '@types';
import { ChainId } from '@enums';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEFAULT_REFERRAL_ADDRESS: AddressMap = {
    [ChainId.BSC]: '0xF5C9DCc09b5241C573A28D0e61cBC393d5c9aCD4'
};

// our wallet
export const TREASURY_ADDRESS: AddressMap = {
    [ChainId.BSC]: '0x612e072e433A8a08496Ee0714930b357426c12Ce'
};
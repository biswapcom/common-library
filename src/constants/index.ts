import { toBN } from "@helpers";

export * from './addresses';
export * from './tokens';

export const INIT_CODE_HASH: string = '0xfea293c909d87cd4153593f077b76bb7e94340200f4ee84211ae8e4f9bd7ffdf';

export const ZERO_BN = toBN( 0);
export const ONE_BN =toBN(1e18.toString());
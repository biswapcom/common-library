"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenXYFromToken = exports.priceUndecimal2PriceDecimal = exports.point2PriceDecimal = exports.getSqrtRatioAtTick = exports.getLiquidityByX = exports.getLiquidityByY = exports.Q96 = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
exports.Q96 = 2n ** 96n;
function getLiquidityByY(amountY, sqrtPrice96) {
    return (amountY * exports.Q96) / sqrtPrice96;
}
exports.getLiquidityByY = getLiquidityByY;
function getLiquidityByX(amountX, sqrtPrice96) {
    return (amountX * sqrtPrice96) / exports.Q96;
}
exports.getLiquidityByX = getLiquidityByX;
function getSqrtRatioAtTick(tick) {
    const MAX_TICK = 887272;
    const absTick = tick < 0 ? BigInt(-tick) : BigInt(tick);
    if (absTick > BigInt(MAX_TICK)) {
        throw new Error('T');
    }
    let ratio = (absTick & BigInt(1)) !== 0n
        ? BigInt('0xfffcb933bd6fad37aa2d162d1a594001')
        : BigInt('0x100000000000000000000000000000000');
    if ((absTick & BigInt(0x2)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xfff97272373d413259a46990580e213a')) >> 128n;
    if ((absTick & BigInt(0x4)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xfff2e50f5f656932ef12357cf3c7fdcc')) >> 128n;
    if ((absTick & BigInt(0x8)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xffe5caca7e10e4e61c3624eaa0941cd0')) >> 128n;
    if ((absTick & BigInt(0x10)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xffcb9843d60f6159c9db58835c926644')) >> 128n;
    if ((absTick & BigInt(0x20)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xff973b41fa98c081472e6896dfb254c0')) >> 128n;
    if ((absTick & BigInt(0x40)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xff2ea16466c96a3843ec78b326b52861')) >> 128n;
    if ((absTick & BigInt(0x80)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xfe5dee046a99a2a811c461f1969c3053')) >> 128n;
    if ((absTick & BigInt(0x100)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xfcbe86c7900a88aedcffc83b479aa3a4')) >> 128n;
    if ((absTick & BigInt(0x200)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xf987a7253ac413176f2b074cf7815e54')) >> 128n;
    if ((absTick & BigInt(0x400)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xf3392b0822b70005940c7a398e4b70f3')) >> 128n;
    if ((absTick & BigInt(0x800)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xe7159475a2c29b7443b29c7fa6e889d9')) >> 128n;
    if ((absTick & BigInt(0x1000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xd097f3bdfd2022b8845ad8f792aa5825')) >> 128n;
    if ((absTick & BigInt(0x2000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0xa9f746462d870fdf8a65dc1f90e061e5')) >> 128n;
    if ((absTick & BigInt(0x4000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0x70d869a156d2a1b890bb3df62baf32f7')) >> 128n;
    if ((absTick & BigInt(0x8000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0x31be135f97d08fd981231505542fcfa6')) >> 128n;
    if ((absTick & BigInt(0x10000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0x9aa508b5b7a84e1c677de54f3e99bc9')) >> 128n;
    if ((absTick & BigInt(0x20000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0x5d6af8dedb81196699c329225ee604')) >> 128n;
    if ((absTick & BigInt(0x40000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0x2216e584f5fa1ea926041bedfe98')) >> 128n;
    if ((absTick & BigInt(0x80000)) !== 0n)
        ratio = (BigInt(ratio) * BigInt('0x48a170391f7dc42444e8fa2')) >> 128n;
    if (tick > 0)
        ratio = (2n ** 256n - 1n) / ratio;
    const sqrtPriceX96 = BigInt(ratio >> 32n) + (ratio % (1n << 32n) == 0n ? 0n : 1n);
    return sqrtPriceX96.toString();
}
exports.getSqrtRatioAtTick = getSqrtRatioAtTick;
const point2PriceDecimal = (tokenA, tokenB, point) => {
    let priceDecimal = 0;
    let needReverse = false;
    const { tokenX, tokenY } = (0, exports.getTokenXYFromToken)(tokenA, tokenB);
    if (point > 0) {
        priceDecimal = (0, exports.priceUndecimal2PriceDecimal)(tokenX, tokenY, new bignumber_js_1.default(1.0001 ** point));
        console.log('-----------priceDecimal---------');
        console.log(priceDecimal);
        needReverse = tokenA.address.toLowerCase() > tokenB.address.toLowerCase();
    }
    else {
        priceDecimal = (0, exports.priceUndecimal2PriceDecimal)(tokenY, tokenX, new bignumber_js_1.default(1.0001 ** (-point)));
        needReverse = tokenA.address.toLowerCase() < tokenB.address.toLowerCase();
    }
    if (needReverse) {
        priceDecimal = 1 / priceDecimal;
    }
    return priceDecimal;
};
exports.point2PriceDecimal = point2PriceDecimal;
const priceUndecimal2PriceDecimal = (tokenA, tokenB, priceUndecimalAByB) => {
    return Number(priceUndecimalAByB.times(10 ** tokenA.decimals).div(10 ** tokenB.decimals));
};
exports.priceUndecimal2PriceDecimal = priceUndecimal2PriceDecimal;
const getTokenXYFromToken = (tokenA, tokenB) => {
    if (tokenA.address.toLowerCase() < tokenB.address.toLowerCase()) {
        return {
            tokenX: { ...tokenA },
            tokenY: { ...tokenB }
        };
    }
    else {
        return {
            tokenX: { ...tokenB },
            tokenY: { ...tokenA }
        };
    }
};
exports.getTokenXYFromToken = getTokenXYFromToken;

import { ethers } from "ethers";
// import { getContract } from "../Addresses";

const TOKENS = {
  85: [
    {
      name: "GT",
      symbol: "GT",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      isShortable: true
    },
    {
      name: "WGT Token",
      symbol: "WGT",
      decimals: 18,
      address: "0xf57B8AE8A5218540b45a2cba6A651A3dC4f7e6a0",
      isWrapped: true,
      imageUrl:
        "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
    },
    {
      name: "ETH Token",
      symbol: "ETH",
      decimals: 18,
      address: "0xB9a0e7ec640120d207ffE1Fc35611828D6596D79",
      isShortable: true,
      imageUrl:
        "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
    },
    {
      name: "BTC Token",
      symbol: "BTC",
      decimals: 18,
      address: "0x71725C9382188f11E8D1d61145Bfda27367Bc26F",
      isShortable: true,
      imageUrl:
        "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744"
    },
    {
      name: "BNB Token",
      symbol: "BNB",
      decimals: 18,
      address: "0x196EBEd51369390Ef2945Aecd0343c5496f7290a",
      isWrapped: true,
      imageUrl:
        "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
    },
    {
      name: "DAI Token",
      symbol: "DAI",
      decimals: 18,
      address: "0x2bBa033B205C93ee37A72De2836ccB010f609844",
      isWrapped: true,
      isStable: true,
      imageUrl:
        "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389"
    },

  ]
};

const CHAIN_IDS = [85];

const TOKENS_MAP = {};
const TOKENS_BY_SYMBOL_MAP = {};

for (let j = 0; j < CHAIN_IDS.length; j++) {
  const chainId = CHAIN_IDS[j];
  TOKENS_MAP[chainId] = {};
  TOKENS_BY_SYMBOL_MAP[chainId] = {};
  for (let i = 0; i < TOKENS[chainId].length; i++) {
    const token = TOKENS[chainId][i];
    TOKENS_MAP[chainId][token.address] = token;
    TOKENS_BY_SYMBOL_MAP[chainId][token.symbol] = token;
  }
}

const WRAPPED_TOKENS_MAP = {};
const NATIVE_TOKENS_MAP = {};
for (const chainId of CHAIN_IDS) {
  for (const token of TOKENS[chainId]) {
    if (token.isWrapped) {
      WRAPPED_TOKENS_MAP[chainId] = token;
    } else if (token.isNative) {
      NATIVE_TOKENS_MAP[chainId] = token;
    }
  }
}

export function getWrappedToken(chainId) {
  return WRAPPED_TOKENS_MAP[chainId];
}

export function getNativeToken(chainId) {
  return NATIVE_TOKENS_MAP[chainId];
}

export function getTokens(chainId) {
  return TOKENS[chainId];
}

export function isValidToken(chainId, address) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }
  return address in TOKENS_MAP[chainId];
}

export function getToken(chainId, address) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }
  if (!TOKENS_MAP[chainId][address]) {
    throw new Error(`Incorrect address "${address}" for chainId ${chainId}`);
  }
  return TOKENS_MAP[chainId][address];
}

export function getTokenBySymbol(chainId, symbol) {
  const token = TOKENS_BY_SYMBOL_MAP[chainId][symbol];
  if (!token) {
    throw new Error(`Incorrect symbol "${symbol}" for chainId ${chainId}`);
  }
  return token;
}

export function getWhitelistedTokens(chainId) {
  return TOKENS[chainId].filter(token => token.symbol !== "USDG");
}

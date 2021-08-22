import tokens from '../../../tokens.json';
import contracts from '../../../embark4Contracts.json';

export const SWAP_MODE = {
  sell: 'sell',
  buy: 'buy',
};

export const SWAP_STATE = {
  start: 'start',
  approve: 'approve',
  end: 'end',
};

export const SETTINGS = {
  maxSlippage: 25,
  maxDelay: 10,
};

export const WETH_ADDRESS = contracts.cloudflare.deploy.WETH.address;
export const STABLE_ADDRESS = tokens.cloudflare.DAI.address;

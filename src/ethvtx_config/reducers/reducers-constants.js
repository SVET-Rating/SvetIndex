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
  minSlippage: 1,
  maxSlippage: 25,
  minDelay: 1,
  maxDelay: 10,
};

export const BUY_STEPS = [
  { label: 'start swap' },
  { label: 'approve swap' },
  { label: 'end swap' },
];

export const SELL_STEPS = [
  { label: 'start swap' },
  { label: 'approve swap' },
  { label: 'approve swap' },
  { label: 'end swap' },
];

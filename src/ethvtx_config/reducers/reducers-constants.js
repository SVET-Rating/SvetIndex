export const SWAP_MODE = {
  sell: 'sell',
  buy: 'buy',
};

export const SWAP_STATE = {
  start: 'start',
  approveToSpend: 'approve to spend',
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
  { step: null, label: 'prepare to swap' },
  { step: SWAP_STATE.start, label: 'start swap' },
  { step: SWAP_STATE.approve, label: 'approve swap' },
  { step: SWAP_STATE.end, label: 'end swap' },
];

export const SELL_STEPS = [
  { step: null, label: 'prepare to swap' },
  { step: SWAP_STATE.start, label: 'start swap' },
  { step: SWAP_STATE.approveToSpend, label: 'approve to spend' },
  { step: SWAP_STATE.approve, label: 'approve swap' },
  { step: SWAP_STATE.end, label: 'end swap' },
];

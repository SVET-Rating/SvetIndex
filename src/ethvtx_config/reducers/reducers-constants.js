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
  { step: null, label: 'prepare to buy' },
  { step: SWAP_STATE.start, label: 'start buy' },
  { step: SWAP_STATE.approve, label: 'approve buy' },
  { step: SWAP_STATE.end, label: 'end buy' },
];

export const SELL_STEPS = [
  { step: null, label: 'prepare to sell' },
  { step: SWAP_STATE.start, label: 'start sell' },
  { step: SWAP_STATE.approveToSpend, label: 'approve to spend index' },
  { step: SWAP_STATE.approve, label: 'approve sell' },
  { step: SWAP_STATE.end, label: 'end sell' },
];

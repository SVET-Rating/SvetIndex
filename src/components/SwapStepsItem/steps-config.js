import { SWAP_STATE } from '../../ethvtx_config/reducers/reducers-constants';

const formatTokenData = (amount, symbol) => {
  return Number(amount) ? `${amount} ${symbol}` : symbol;
};

export const BUY_STEPS = [
  { step: null, label: (amount, symbol) => `prepare to buy ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.start, label: (amount, symbol) => `start buy ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.approve, label: (amount, symbol) => `approve buy ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.end, label: 'end buy' },
];

export const SELL_STEPS = [
  { step: null, label: (amount, symbol) => `prepare to sell ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.start, label: (amount, symbol) => `start sell ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.approveToSpend, label: (amount, symbol) => `approve to spend ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.approve, label: (amount, symbol) => `approve sell ${formatTokenData(amount, symbol)}` },
  { step: SWAP_STATE.end, label: 'end sell' },
];

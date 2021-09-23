import React from 'react';
import { SWAP_STATE } from '../../ethvtx_config/reducers/reducers-constants';

const formatTokenData = (amount, symbol) => {
  return Number(amount) ? `${amount} ${symbol}` : symbol;
};

export const BUY_STEPS = [
  {
    step: null,
    label: (amount, symbol) => (
      <><span>prepare to buy</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.start,
    label: (amount, symbol) => (
      <><span>start buy</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.approve,
    label: (amount, symbol) => (
      <><span>approve buy</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.end,
    label: 'end buy',
  },
];

export const SELL_STEPS = [
  {
    step: null,
    label: (amount, symbol) => (
      <><span>prepare to sell</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.start,
    label: (amount, symbol) => (
      <><span>start sell</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.approveToSpend,
    label: (amount, symbol) => (
      <><span>approve to spend</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.approve,
    label: (amount, symbol) => (
      <><span>approve sell</span><br /><span>{formatTokenData(amount, symbol)}</span></>
    ),
  },
  {
    step: SWAP_STATE.end,
    label: 'end sell',
  },
];

import React from 'react';
import { connect } from 'react-redux';
import { Box, ListItem } from '@material-ui/core';
import { SWAP_MODE, WETH_ADDRESS } from '../../ethvtx_config/reducers/reducers-constants';
import { setSwapMode } from '../../ethvtx_config/actions/actions';
import AssetItemTitle from '../AssetItemTitle/AssetItemTitle';
import AssetItemAddress from '../AssetItemAddress/AssetItemAddress';
import AssetItemTokens from '../AssetItemTokens/AssetItemTokens';
import AssetItemBalance from '../AssetItemBalance/AssetItemBalance';
import AppButton from '../AppButton/AppButton';
import useStyles from './styles';

const AssetItem = ({ item, onBuy, onSell }) => {
  const classes = useStyles();

  const handleClickBuy = () => {
    onBuy(item.addr);
  };

  const handleClickSell = () => {
    onSell(item.addr);
  };

  return (
    <ListItem
      className={classes.root}
      id={item.addr}
    >
      <AssetItemTitle asset={item} />
      <AssetItemAddress address={item.addr} />
      <AssetItemTokens address={item.addr} />
      <AssetItemBalance address={item.addr} />

      <Box className={classes.actionSection}>
        <AppButton
          className={classes.button}
          onClick={handleClickBuy}
        >Buy</AppButton>

        <AppButton
          className={classes.button}
          onClick={handleClickSell}
        >Sell</AppButton>
      </Box>
    </ListItem>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onBuy: (asset) => dispatch(setSwapMode({
    assetIn: asset,
    assetOut: WETH_ADDRESS,
    mode: SWAP_MODE.buy,
  })),
  onSell: (asset) => dispatch(setSwapMode({
    assetIn: asset,
    assetOut: WETH_ADDRESS,
    mode: SWAP_MODE.sell
  })),
});

export default connect(null, mapDispatchToProps)(AssetItem);

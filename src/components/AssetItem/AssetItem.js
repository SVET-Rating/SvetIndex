import React from 'react';
import { connect } from 'react-redux';
import { Box, ListItem } from '@material-ui/core';
import { SWAP_MODE } from '../../ethvtx_config/reducers/reducers-constants';
import * as a from '../../ethvtx_config/actions/actions';
import * as s from '../../ethvtx_config/selectors/selectors';
import AssetItemTitle from '../AssetItemTitle/AssetItemTitle';
import AssetItemAddress from '../AssetItemAddress/AssetItemAddress';
import AssetItemTokens from '../AssetItemTokens/AssetItemTokens';
import AssetItemBalance from '../AssetItemBalance/AssetItemBalance';
import AppButton from '../AppButton/AppButton';
import useStyles from './styles';

const AssetItem = ({ item, onBuy, onSell, assetOutAddress }) => {
  const classes = useStyles();

  const handleClickBuy = () => {
    onBuy(item.addr, assetOutAddress);
  };

  const handleClickSell = () => {
    onSell(item.addr, assetOutAddress);
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
};

const mapStateToProps = (state) => ({
  assetOutAddress: s.selectWEthAddress(state),
});

const mapDispatchToProps = (dispatch) => ({
  onBuy: (asset, assetOut) => dispatch(a.setSwapMode({
    assetIn: asset,
    assetOut,
    mode: SWAP_MODE.buy,
  })),
  onSell: (asset, assetOut) => dispatch(a.setSwapMode({
    assetIn: asset,
    assetOut,
    mode: SWAP_MODE.sell
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetItem);

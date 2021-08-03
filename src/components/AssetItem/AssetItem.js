import React from 'react';
import { connect } from 'react-redux';
import { Box, ListItem } from '@material-ui/core';
// import { getContract, getContractList } from 'ethvtx/lib/getters';
import { SWAP_MODE } from '../../ethvtx_config/reducers';
import { setSwapMode } from '../../ethvtx_config/actions';
import AssetItemTitle from '../AssetItemTitle/AssetItemTitle';
import AssetItemAddress from '../AssetItemAddress/AssetItemAddress';
import AssetItemTokens from '../AssetItemTokens/AssetItemTokens';
import AssetItemBalance from '../AssetItemBalance/AssetItemBalance';
import Button from '../Button/Button';
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
        <Button
          className={classes.button}
          onClick={handleClickBuy}
        >Buy</Button>

        <Button
          className={classes.button}
          onClick={handleClickSell}
        >Sell</Button>
      </Box>
    </ListItem>
  );
}

// const mapStateToProps = (state, { item }) => ({
//   contract: getContract(state, 'OraclePrice', '@oracleprice'),
//   contractList: getContractList(state),
// });

const mapDispatchToProps = (dispatch) => ({
  onBuy: (asset) => dispatch(setSwapMode({ asset, mode: SWAP_MODE.buy })),
  onSell: (asset) => dispatch(setSwapMode({ asset, mode: SWAP_MODE.sell })),
});

export default connect(null, mapDispatchToProps)(AssetItem);

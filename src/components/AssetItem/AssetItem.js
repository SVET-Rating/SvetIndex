import React from 'react';
import { Box, Button, ListItem } from '@material-ui/core';
import AssetItemTitle from '../AssetItemTitle/AssetItemTitle';
import AssetItemAddress from '../AssetItemAddress/AssetItemAddress';
import AssetItemTokens from '../AssetItemTokens/AssetItemTokens';
import AssetItemBalance from '../AssetItemBalance/AssetItemBalance';
import useStyles from './styles';

const AssetItem = ({ item, startBuyToken, startSellToken }) => {
  const classes = useStyles();

  const handleClickBuy = () => {
    startBuyToken();
  };

  const handleClickSell = () => {
    startSellToken();
  };

  return (
    <ListItem
      className={classes.root}
      id={item.addr}
    >
      <AssetItemTitle asset={item} />
      <AssetItemAddress address={item.addr} />
      <AssetItemTokens tokens={item.tokens} />
      <AssetItemBalance balance={item.balance} price={item.price} />

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

export default AssetItem;

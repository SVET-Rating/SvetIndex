import React from 'react';
import { connect } from 'react-redux';
import { getContract } from 'ethvtx/lib/getters';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import AssetItemTokensShare from '../AssetItemTokensShare/AssetItemTokensShare';
import useStyles from './styles';

const AssetItemTokens = ({ tokens = [] }) => {
  const classes = useStyles();

  const items = tokens.map((token) => (
    <ListItem key={token.addrActive}>
      <AssetItemTokensShare token={token} />
    </ListItem>
  ));

  return (
    <Box className={classes.root}>
      <List className={classes.list}>
        {items}
      </List>

      <Typography className={classes.text}>
        All ({items.length})
      </Typography>
    </Box>
  );
}

const getAssetTokenList = (state, assetAddress) => {
  if (assetAddress) {
    return getContract(state, 'IndexToken', assetAddress).fn.getActivesList();
  }
};

const mapStateToProps = (state, { address }) => ({
  tokens: getAssetTokenList(state, address),
});

export default connect(mapStateToProps)(AssetItemTokens);

import React from 'react';
import { connect } from 'react-redux';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import { selectAssetTokenListByAddress } from '../../ethvtx_config/selectors/selectors';
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

const mapStateToProps = (state, { address }) => ({
  tokens: selectAssetTokenListByAddress(state, address),
});

export default connect(mapStateToProps)(AssetItemTokens);

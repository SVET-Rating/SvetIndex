import React from 'react';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import AssetItemTokensShare from '../AssetItemTokensShare/AssetItemTokensShare';
import useStyles from './styles';

const AssetItemTokens = ({ tokens }) => {
  const classes = useStyles();

  const assets = tokens.map((address) => (
    <ListItem key={address.addrActive}>
      <AssetItemTokensShare address={address} />
    </ListItem>
  ));

  return (
    <Box className={classes.root}>
      <List className={classes.list}>
        {assets}
      </List>

      <Typography className={classes.text}>
        All ({assets.length})
      </Typography>
    </Box>
  );
}

export default AssetItemTokens;

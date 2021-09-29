import React from 'react';
import { connect } from 'react-redux';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import * as s from '../../ethvtx_config/selectors/selectors';
import AssetItemTokensShare from '../AssetItemTokensShare/AssetItemTokensShare';
import AssetItemTokensList from './AssetItemTokensList/AssetItemTokensList';
import AppInfoButton from '../AppInfoButton/AppInfoButton';
import useStyles from './styles';

const AssetItemTokens = ({ address, tokens = [] }) => {
  const classes = useStyles();

  if (!tokens.length) {
    return null;
  }

  const items = tokens.map((token) => (
    <ListItem key={token.addrActive}>
      <AssetItemTokensShare assetAddress={address} token={token} />
    </ListItem>
  ));

  return (
    <Box className={classes.root}>
      <List className={classes.list}>
        {items}
      </List>

      <Typography className={classes.text}>
        {items.length >=3 ? (
          <AppInfoButton
            classes={{
              button: classes.infoButton,
              paper: classes.infoPaper,
            }}
            label={`All (${items.length})`}
            icon={ExpandMoreIcon}
            iconOn={ExpandLessIcon}
            placement='bottom-start'
            disableCloseOnBlur
          >
            <AssetItemTokensList address={address} />
          </AppInfoButton>
        ) : `All (${items.length})`}
      </Typography>
    </Box>
  );
}

const mapStateToProps = (state, { address }) => ({
  tokens: s.selectAssetTokensListByAddress(state, address),
});

export default connect(mapStateToProps)(AssetItemTokens);

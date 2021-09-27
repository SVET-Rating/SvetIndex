import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import AppEtherAddress from '../AppEtherAddress/AppEtherAddress';
import useStyles from './styles';

const AssetItemAddress = ({
  address,
  explorerName,
  explorerUrl,
}) => {
  const classes = useStyles();

  if (!address) {
    return null;
  }

  const goTo = explorerUrl
    ? (
        <Typography className={classes.text}>
          <span>go to</span>
          <a className={classes.link}
            href={`${explorerUrl}/address/${address}`}
            target="_blank"
          >
            {explorerName || explorerUrl}
          </a>
        </Typography>
      )
    : null;

  return (
    <Box className={classes.root}>
      <AppEtherAddress address={address} />

      {goTo}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  explorerName: s.selectExplorerName(state),
  explorerUrl: s.selectExplorerUrl(state),
});

export default connect(mapStateToProps)(AssetItemAddress);

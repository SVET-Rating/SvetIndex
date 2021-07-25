import React from 'react';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';

const AssetsCostCompare = ({ assetInLabel, assetOutLabel, assetOutAmount }) => {
  const classes = useStyles();

  const assetInAmount = 1;
  return (
    <Box className={classes.root}>
      <Typography className={classes.costCompare}>
        {assetInAmount}&nbsp;
        <span className={classes.label}>{assetInLabel}</span>
        &nbsp;=&nbsp;{assetOutAmount}&nbsp;
        <span className={classes.label}>{assetOutLabel}</span>
      </Typography>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  assetInLabel: 'SVET-1',
  assetOutLabel: 'ETH',
  assetOutAmount: '0.01256',
});

export default connect(mapStateToProps)(AssetsCostCompare);

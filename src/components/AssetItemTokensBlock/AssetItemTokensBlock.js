import React from 'react';
import { Box } from '@material-ui/core';
import AssetItemTokensTable from '../AssetItemTokensTable/AssetItemTokensTable';
import AssetItemTokensChart from '../AssetItemTokensChart/AssetItemTokensChart';
import useStyles from './styles';

const AssetItemTokensBlock = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AssetItemTokensTable />
      <AssetItemTokensChart />
    </Box>
  );
};

export default AssetItemTokensBlock;

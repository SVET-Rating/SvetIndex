import React from 'react';
import { Box } from '@material-ui/core';
import AssetItemTokensTable from '../AssetItemTokensTable/AssetItemTokensTable';
import AssetItemTokensTableChart from '../AssetItemTokensTableChart/AssetItemTokensTableChart';
import useStyles from './styles';

const AssetItemTokensBlock = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AssetItemTokensTable />
      <AssetItemTokensTableChart />
    </Box>
  );
};

export default AssetItemTokensBlock;

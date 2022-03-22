import React from 'react';
import { Box } from '@material-ui/core';
import AssetsList from '../AssetsList/AssetsList';
import useStyles from './styles';

const AssetsBlock = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AssetsList />
    </Box>
  );
};

export default AssetsBlock;

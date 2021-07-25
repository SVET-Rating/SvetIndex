import React from 'react';
import { Box, List } from '@material-ui/core';
import AssetsListAssetItem from '../AssetsListAssetItem/AssetsListAssetItem';
import useStyles from './styles';

const AssetsList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {/* <Box className="left-list-header">
        <Typography className="header-index">
          Indexes
        </Typography>
      </Box> */}
      <List className={classes.list}>
        <AssetsListAssetItem />
      </List>
    </Box>
  );
};

export default AssetsList;

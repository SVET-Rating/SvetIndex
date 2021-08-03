import React from 'react';
import { Box, List, Typography } from '@material-ui/core';
import IndexTokensListItem from './IndexTokensListItem';

const IndexTokensList = () => {
  return (
    <Box>
      <Box className="left-list-header">
        <Typography className="header-index">
          Indexes
        </Typography>
      </Box>
      <List className="left-list-items">
        <IndexTokensListItem />
      </List>
    </Box>
  );
};

export default IndexTokensList;

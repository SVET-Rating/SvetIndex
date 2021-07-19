import React from 'react';
import { Box } from '@material-ui/core';
import AssetItemTokensTable from '../AssetItemTokensTable/AssetItemTokensTable';

const TokensInIndexTokenList = () => {
  return (
    <Box className="right-list-items">
      <AssetItemTokensTable/>
    </Box>
  );
};

export default TokensInIndexTokenList;

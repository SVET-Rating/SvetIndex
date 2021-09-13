import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

const TheFooter = () => {
  const classes = useStyles();

  return (
    <Box component='footer' className={classes.root}>
      <Typography>
        SVET Supply-Weighted Index
      </Typography>

      <Link
        className={classes.link}
        href="http://svetrating.com/svet_index_supply/"
        target="_blank"
      >
        READ MORE about SVET-SWI
      </Link>
    </Box>
  );
};

export default TheFooter;

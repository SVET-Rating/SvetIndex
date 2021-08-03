import React from 'react';
import { AppBar, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

const TheFooter = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Typography>
        SVET Supply-Weighted Index (SVET-SWI)
      </Typography>

      <Link href="http://svetrating.com/svet_index_supply/">
        READ MORE about SVET-SWI
      </Link>
    </AppBar>
  );
};

export default TheFooter;

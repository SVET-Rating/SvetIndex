import React from 'react';
import { Typography, Link } from '@material-ui/core';
import useStyles from './styles';

const TheFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography>
        SVET Supply-Weighted Index (SVET-SWI)
      </Typography>

      <Link
        href="http://svetrating.com/svet_index_supply/"
        target="_blank"
      >
        READ MORE about SVET-SWI
      </Link>
    </footer>
  );
};

export default TheFooter;

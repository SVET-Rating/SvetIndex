import React from 'react';
import useStyles from './styles';

const HeaderLogo = () => {
  const classes = useStyles();

  return (
    <span className={classes.root}>
      SVET Token
    </span>
  );
};

export default HeaderLogo;

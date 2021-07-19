import React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderWallet from '../HeaderWallet/HeaderWallet';
import useStyles from './styles';

const TheHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>

        <IconButton className={classes.menuButton} disabled color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" className={classes.grow}>
          <HeaderLogo />
        </Typography>

        <HeaderWallet />

      </Toolbar>
    </AppBar>
  );
};

export default TheHeader;

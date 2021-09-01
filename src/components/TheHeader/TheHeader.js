import React from 'react';
import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderWallet from '../HeaderWallet/HeaderWallet';
import OrbitLoader from '../loaders/OrbitLoader/OrbitLoader';
import useStyles from './styles';

const TheHeader = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>

        <IconButton className={classes.menuButton} disabled color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>

        <Box className={classes.grow}>
          <Typography variant="h6" color="inherit">
            <HeaderLogo />
          </Typography>
          <OrbitLoader className={classes.loader} loading={true} />
        </Box>

        <HeaderWallet />

      </Toolbar>
    </AppBar>
  );
};

export default TheHeader;

import React from 'react';
import { connect } from 'react-redux';
import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import * as s from '../../ethvtx_config/selectors/selectors';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderWallet from '../HeaderWallet/HeaderWallet';
import OrbitLoader from '../loaders/OrbitLoader/OrbitLoader';
import useStyles from './styles';

const TheHeader = ({ processState }) => {
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
          <OrbitLoader className={classes.loader} loading={processState} />
        </Box>

        <HeaderWallet />

      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  processState: s.selectSwapProcessState(state),
});

export default connect(mapStateToProps)(TheHeader);

import React, { useState } from 'react';
import { Fade, Paper, Popper, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const AppInfoButton = ({
  className,
  classNameButton,
  content = 'Info',
  placement = 'bottom',
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AppButtonInline
        className={classNameButton}
        onClick={(e) => handleClick(e)}
        onBlur={() => setOpen(false)}
      >
        <InfoOutlinedIcon />
      </AppButtonInline>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade
            {...TransitionProps}
            timeout={350}
          >
            <Paper className={`${classes.paper} ${className}`}>
              <Typography className={classes.typography}>
                {content}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default AppInfoButton;

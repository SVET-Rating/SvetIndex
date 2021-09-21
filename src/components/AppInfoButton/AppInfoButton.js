import React, { useState } from 'react';
import { Fade, Paper, Popper, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const AppInfoButton = ({
  className,
  classNameButton,
  content = '',
  placement = 'bottom',
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  return (
    <>
      <AppButtonInline
        className={classNameButton}
        onClick={handleClick}
        onBlur={handleBlur}
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
            <Paper className={`${classes.root} ${className}`}>
              <Typography>
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

import React, { useState } from 'react';
import { Box, Fade, Paper, Popper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const AppInfoButton = ({
  classes: {
    button: classNameButton,
    paper: classNamePaper,
    icon: classNameIcon,
  },
  children,
  content = '',
  placement = 'bottom',
  disableCloseOnBlur = false,
  disableCloseOnClick = false,
  open = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(!!open);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    if (disableCloseOnClick && isOpen) {
      return;
    }

    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    if (!disableCloseOnBlur) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <AppButtonInline
        className={classNameButton}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        <InfoOutlinedIcon className={classNameIcon} />
      </AppButtonInline>

      <Popper
        style={{ zIndex: theme.zIndex.tooltip }}
        open={isOpen}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade
            {...TransitionProps}
            timeout={350}
          >
            <Paper className={`${classes.root} ${classNamePaper}`}>
              <Box>
                {children || content}
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default AppInfoButton;

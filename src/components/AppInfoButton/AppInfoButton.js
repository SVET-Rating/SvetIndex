import React, { useState } from 'react';
import { Box, Fade, Paper, Popper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InfoIcon from '@material-ui/icons/Info';
import AppButtonInline from '../AppButtonInline/AppButtonInline';
import useStyles from './styles';

const AppInfoButton = ({
  classes: {
    button: classNameButton = '',
    paper: classNamePaper = '',
    icon: classNameIcon = '',
    label: classNameLabel = '',
  } = {},
  children,
  content = '',
  placement = 'bottom',
  disableCloseOnBlur = false,
  disableCloseOnClick = false,
  open = false,
  label,
  labelOn,
  icon: IconOff,
  iconOn: IconOn,
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

  const Icon = isOpen
    ? (IconOn || IconOff || InfoIcon)
    : (IconOff || InfoOutlinedIcon);

  const buttonLabel = isOpen ? (labelOn || label) : label;

  return (
    <>
      <AppButtonInline
        className={classNameButton}
        onClick={handleClick}
        onBlur={handleBlur}
      >
        {buttonLabel && (
          <span className={`${classes.buttonLabel} ${classNameLabel}`}>
            {buttonLabel}
          </span>
        )}
        <Icon className={classNameIcon} />
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

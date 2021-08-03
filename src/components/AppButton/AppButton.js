import React from 'react';
import { Button as MUIButton} from '@material-ui/core';
import useStyles from './styles';

const AppButton = ({ className, children, ...props }) => {
  const classes = useStyles();

  return (
    <MUIButton
      className={`${classes.root} ${className}`}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export default AppButton;

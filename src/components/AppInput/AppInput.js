import React from 'react';
import useStyles from './styles';

const AppInput = ({ className, children, ...props }) => {
  const classes = useStyles();

  return (
    <input
      className={`${classes.root} ${className}`}
      {...props}
    />
  );
};

export default AppInput;

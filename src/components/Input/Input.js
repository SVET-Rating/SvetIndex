import React from 'react';
import useStyles from './styles';

const Input = ({ className, children, ...props }) => {
  const classes = useStyles();

  return (
    <input
      className={`${classes.root} ${className}`}
      {...props}
    />
  );
};

export default Input;

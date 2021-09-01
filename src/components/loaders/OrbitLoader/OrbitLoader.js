import React from 'react';
import useStyles from './styles';

const OrbitLoader = ({ className = null, loading = false }) => {
  const classes = useStyles();

  return loading ? (
    <div className={`${classes.root} ${className}`}>
      <div className={classes.orbit}></div>
      <div className={classes.orbit}></div>
      <div className={classes.orbit}></div>
    </div>
  ) : null;
};

export default OrbitLoader;

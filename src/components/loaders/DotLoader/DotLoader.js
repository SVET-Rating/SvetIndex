import React from 'react';
import { Box } from '@material-ui/core';
import { DotLoader as Loader } from "react-spinners";
import { css } from "@emotion/react";
import theme from '../../../theme';
import useStyles from './styles';

const override = css`
  position: absolute;
  z-index: 1000;
`;

const DotLoader = ({
  className = null, size = 30, loading = false, color = '',
}) => {
  const classes = useStyles();

  const computedColor = color || theme.palette.text.corporate;

  return (
    <Box className={`${classes.root} ${className}`}>
      <Loader
        color={computedColor}
        loading={loading}
        css={override}
        size={size}
      />
    </Box>
  );
};

export default DotLoader;

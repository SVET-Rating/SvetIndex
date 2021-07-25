import React from 'react';
import { Box } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import useStyles from './styles';

const AssetItemTokensTableChart = ({ items }) => {
  const classes = useStyles();

  const labels = [];
  const data = [];
  items.forEach(({ symbol, amount }) => {
    labels.push(symbol);
    data.push((amount / 100).toFixed(2));
  });

  return (
    <Box className={classes.root}>
      <Pie className={classes.chart}
        data={{
          labels,
          datasets: [{ data }],
        }}
      />
    </Box>
  );
}

export default AssetItemTokensTableChart;

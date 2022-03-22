import React from 'react';
import { connect } from 'react-redux';
import * as s from '../../ethvtx_config/selectors/selectors';
import { Box } from '@material-ui/core';
import { Doughnut as Chart } from 'react-chartjs-2';
import { getChartColors } from '../../helpers';
import { chartOptions } from './chartOptions';
import useStyles from './styles';

const AssetItemTokensChart = ({ tokens }) => {
  const classes = useStyles();

  if (!tokens) {
    return null;
  }

  const labels = [];
  const backgroundColor = [];
  const hoverBackgroundColor = [];
  const data = [];

  tokens.forEach(({ symbol, share }, idx) => {
    const { color, hoverColor } = getChartColors(idx);
    labels.push(symbol);
    backgroundColor.push(color);
    hoverBackgroundColor.push(hoverColor);
    data.push((share * 100).toFixed(2));
  });

  return (
    <Box className={classes.root}>
      <Chart
        className={classes.chart}
        data={{
          labels,
          datasets: [{
            data,
            backgroundColor,
            hoverBackgroundColor,
          }],
        }}
        options={chartOptions}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  tokens: s.selectAssetInTokensListWithLastPriceShares(state),
});

export default connect(mapStateToProps)(AssetItemTokensChart);

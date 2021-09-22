import React from 'react';
import { connect } from 'react-redux';
import * as s from '../../ethvtx_config/selectors/selectors';
import { Box } from '@material-ui/core';
import { Doughnut as Chart } from 'react-chartjs-2';
import { getChartColors } from '../../helpers';
import { chartOptions } from './chartOptions';
import useStyles from './styles';

const AssetItemTokensTableChart = ({ items, tokensPrices, assetInPrice }) => {
  const classes = useStyles();

  if (!items || !tokensPrices || !assetInPrice) {
    return null;
  }

  const labels = [];
  const backgroundColor = [];
  const hoverBackgroundColor = [];
  const data = [];

  items.forEach(({ symbol }, idx) => {
    const { color, hoverColor } = getChartColors(idx);
    labels.push(symbol);
    backgroundColor.push(color);
    hoverBackgroundColor.push(hoverColor);
    data.push((tokensPrices[idx] / assetInPrice * 100).toFixed(2));
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
  items: s.selectAssetInTokensList(state),
  tokensPrices: s.selectAssetInAllTokensPriceForAmountByAddress(state),
  assetInPrice: s.selectAssetInPriceForAmount(state),
});

export default connect(mapStateToProps)(AssetItemTokensTableChart);

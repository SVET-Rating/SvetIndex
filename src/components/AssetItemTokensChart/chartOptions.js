import theme from '../../theme';

export const chartOptions = {
  defaults: {
    font: {
      family: theme.typography.fontFamily,
      size: theme.typography.fontSize,
    },
  },
  plugins: {
    legend: {
      position: 'left',
      align: 'start',
      labels: {
        boxWidth: 40,
        boxHeight: 1.2 * theme.typography.fontSize,
        color: theme.palette.common.white,
      },
    },
    tooltip: {
      bodyFont: {
        family: theme.typography.fontFamily,
        size: theme.typography.fontSize,
      },
      bodyColor: theme.palette.common.white,
      boxWidth: 1.5 * theme.typography.fontSize,
      multiKeyBackground: 'transparent',
      callbacks: {
        label: function(context) {
          const { label, formattedValue } = context;
          if (label && formattedValue) {
            return `${label} - ${formattedValue}%`;
          }
        },
      },
    },
  },
  elements: {
    arc: {
      borderColor: 'transparent',
      borderWidth: 1,
    },
  },
};

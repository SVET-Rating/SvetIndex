import { alpha } from '@material-ui/core/styles';
import { colors } from '../assets/colors.json';

const getChartColors = (index) => {
  const idx = (index > colors.length - 1)
    ? ((index + 1) % colors.length) - 1
    : index;

  const hoverColor = alpha(colors[idx], 0.4);
  const color = colors[idx];

  return {
    color,
    hoverColor,
  };
}

export default getChartColors;

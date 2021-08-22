import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      height: '2.5rem',
      border: 'none',
      color: theme.palette.common.white,
      background: theme.palette.background.linearGradient,
      pointerEvents: 'none',
    },
    '& div > button': {
      color: theme.palette.text.corporate,
      background: theme.palette.background.linearGradient,
      '--main-color': theme.palette.background.linearGradient,
    },
  },
}));

export default useStyles;

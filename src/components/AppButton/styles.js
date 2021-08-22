import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1,
    color: theme.palette.text.corporate,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.linearGradient,
    // transition: 'background 0.3s linear',
    '&:hover': {
      background: theme.palette.background.linearGradientHover,
    },
  },
}));

export default useStyles;

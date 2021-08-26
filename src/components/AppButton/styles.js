import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1,
    color: theme.palette.text.corporate,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.linearGradient,
    opacity: 0.75,
    transition: 'opacity 0.3s linear',
    '&:hover': {
      opacity: 1.0,
    },
    '&:disabled': {
      color: fade(theme.palette.text.corporate, 0.4),
    },
  },
}));

export default useStyles;

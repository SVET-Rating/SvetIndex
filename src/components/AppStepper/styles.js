import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainRoot: {
    width: '100%',
  },
  stepper: {
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
  },
  step: {
    '& svg': {
      color: theme.palette.text.corporate,
    },
  },
  root: {
    padding: theme.spacing(1),
    background: theme.palette.background.linearGradient,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.corporate,
    '&$completed': {
      color: theme.palette.text.corporate,
    },
  },
  completed: {},
}));

export default useStyles;

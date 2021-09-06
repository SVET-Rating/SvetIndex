import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    padding: theme.spacing(1, 0),
    backgroundColor: 'transparent',
    pointerEvents: 'none',
  },
  step: {},
  stepLabel: {
    padding: theme.spacing(1),
    background: theme.palette.background.linearGradient,
    borderRadius: theme.shape.borderRadius,

    '& .MuiStepIcon-root.MuiStepIcon-completed, & .MuiStepLabel-label.MuiStepLabel-completed': {
      color: theme.palette.text.important,
    },

    '& .MuiStepIcon-root.MuiStepIcon-active, & .MuiStepLabel-label.MuiStepLabel-active': {
      color: theme.palette.text.corporate,
    },

    '& .MuiStepLabel-label': {
      color: fade(theme.palette.common.white, 0.5),
    },
  },
}));

export default useStyles;

import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    padding: theme.spacing(1, 0),
    backgroundColor: 'transparent',

    '& .MuiStep-alternativeLabel': {
      alignSelf: 'stretch',
    },
  },
  step: {
    '& .MuiStepConnector-root': {
      display: 'none',
    },

    '& .MuiStepLabel-root': {
      height: '100%',
    },
  },
  tooltip: {
    '& .MuiTooltip-tooltip': {
      background: theme.palette.background.linearGradient,
      fontSize: '0.85rem',
    },
    '& .MuiTooltip-tooltipPlacementBottom': {
      margin: theme.spacing(1, 0),
    },
  },
  stepLabel: {
    padding: theme.spacing(1),
    background: theme.palette.background.main,
    borderRadius: theme.shape.borderRadius,

    '& .MuiStepIcon-root.MuiStepIcon-completed, & .MuiStepLabel-label.MuiStepLabel-completed': {
      color: theme.palette.text.important,
    },

    '& .MuiStepIcon-root.MuiStepIcon-active, & .MuiStepLabel-label.MuiStepLabel-active': {
      color: theme.palette.text.corporate,
    },

    '& .MuiStepLabel-label': {
      color: alpha(theme.palette.common.white, 0.5),
    },

    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      marginTop: theme.spacing(1),
    },

    '& .MuiStepLabel-iconContainer': {
      paddingRight: 0,
    },

    [theme.breakpoints.down('xs')]: {
      '& .MuiStepLabel-label': {
        display: 'none',
      },
    },
  },
}));

export default useStyles;

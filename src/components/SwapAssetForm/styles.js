import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    width: theme.spacing(40),
    padding: theme.spacing(3, 2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderRadius: theme.shape.borderRadius,
    // borderRadius: `${2 * theme.shape.borderRadius}px`,
    backgroundColor: theme.palette.background.main,
    color: theme.palette.common.white,
    '& > * + *': {
      marginTop: theme.spacing(1.5),
    },
    boxShadow: theme.shadows[3],
  },
  actionsDisabled: {
    pointerEvents: 'none',
  },
  swapBlock: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1.5),
    },
  },
  swapIcon: {
    alignSelf: 'center',
    padding: theme.spacing(1),
    background: theme.palette.background.linearGradient,
    textAlign: 'center',
  },
  actionSection: {
    display: 'flex',
    justifyContent: 'center',
    '& > button + button': {
      marginLeft: theme.spacing(2),
    },
  },
  button: {
    flexGrow: 1,
    position: 'relative',
    width: '30%',
  },
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default useStyles;

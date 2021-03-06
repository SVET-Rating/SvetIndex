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
    borderRadius: `${2 * theme.shape.borderRadius}px`,
    backgroundColor: theme.palette.background.main,
    color: theme.palette.common.white,
    '& > * + *': {
      marginTop: theme.spacing(1.5),
    },
    boxShadow: theme.shadows[3],
  },
  swapBlock: {
    padding: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  swapIcon: {
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
    width: '30%',
  },
}));

export default useStyles;

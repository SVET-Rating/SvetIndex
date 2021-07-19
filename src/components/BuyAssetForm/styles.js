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
    backgroundColor: '#26272F',
    color: theme.palette.common.white,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  swapBlock: {
    padding: theme.spacing(4, 2),
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
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1,
    color: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(#383C47, #2C2F38)',
    '&:hover': {
      background: 'linear-gradient(#382586, #2C2F38)',
    },
  },
}));

export default useStyles;

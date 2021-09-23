import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    userSelect: 'none',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      justifyContent: 'unset',
      alignItems: 'baseline',
      width: '100%',
      marginBottom: theme.spacing(1),
    },
  },
  text: {
    flexShrink: 0,
    color: alpha(theme.palette.common.white, 0.5),
    fontSize: '0.8em',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'unset',
    },
  },
  address: {
    maxWidth: theme.spacing(35),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
      maxWidth: 'unset',
    },
  },
  infoButton: {
    padding: theme.spacing(0.5),
    '& svg': {
      width: '0.7em',
      height: '0.7em',
    },
  },
}));

export default useStyles;

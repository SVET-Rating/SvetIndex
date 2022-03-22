import { makeStyles } from '@material-ui/core/styles';

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
  text: {},
  address: {
    maxWidth: theme.spacing(35),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(2),
      maxWidth: 'unset',
    },
  },
}));

export default useStyles;

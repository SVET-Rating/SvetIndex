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
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    backgroundColor: '#26272F',
    color: theme.palette.common.white,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;

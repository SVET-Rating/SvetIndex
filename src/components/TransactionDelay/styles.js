import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'inherit',
  },
  label: {
    color: 'inherit',
    cursor: 'pointer',
  },
  value: {
    fontFamily: 'inherit',
  },
  input: {
    width: theme.spacing(5),
    marginRight: theme.spacing(0.5),
  },
}));

export default useStyles;

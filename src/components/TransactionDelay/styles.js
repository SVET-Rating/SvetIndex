import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'inherit',
    cursor: 'pointer',
  },
  input: {
    width: theme.spacing(5),
  },
}));

export default useStyles;

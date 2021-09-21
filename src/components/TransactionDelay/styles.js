import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    userSelect: 'none',
  },
  label: {
    color: 'inherit',
    cursor: 'pointer',
  },
  input: {
    width: theme.spacing(4),
    marginRight: theme.spacing(0.5),
  },
}));

export default useStyles;

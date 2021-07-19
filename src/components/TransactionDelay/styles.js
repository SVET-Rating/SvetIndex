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
    padding: theme.spacing(0.5),
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(#383C47, #2C2F38)',
    color: theme.palette.common.white,
    fontSize: 'inherit',
    fontWeight: 700,
    textAlign: 'right',
  },
}));

export default useStyles;

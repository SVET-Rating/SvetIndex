import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(8),
    padding: theme.spacing(0.75),
    background: 'linear-gradient(#383C47, #2C2F38)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    userSelect: 'none',
  },
  icon: {
    marginBottom: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.common.white,
  },
}));

export default useStyles;

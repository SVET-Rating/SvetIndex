import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5),
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.linearGradient,
    color: theme.palette.common.white,
    fontSize: 'inherit',
    fontWeight: 700,
    textAlign: 'right',
  },
}));

export default useStyles;

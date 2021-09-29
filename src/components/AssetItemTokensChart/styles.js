import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2, 2),
    width: '100%',
    backgroundColor: theme.palette.background.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  chart: {
    maxHeight: theme.spacing(30),
  },
}));

export default useStyles;

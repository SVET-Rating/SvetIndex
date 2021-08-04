import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#26272F',
    color: theme.palette.common.white,
  },
}));

export default useStyles;

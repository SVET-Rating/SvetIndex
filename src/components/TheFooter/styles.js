import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.main,
    color: theme.palette.common.white,
  },
  link: {
    color: theme.palette.text.corporate,
  },
}));

export default useStyles;

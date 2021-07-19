import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(0.5, 0),
  },
  text: {
    color: theme.palette.common.white,
  },
  value: {
    color: theme.palette.primary.main,
  },
}));

export default useStyles;

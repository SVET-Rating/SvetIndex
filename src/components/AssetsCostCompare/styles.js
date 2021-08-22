import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compareAmount: {
    padding: theme.spacing(0, 1),
    color: theme.palette.text.important,
  },
}));

export default useStyles;

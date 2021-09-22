import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: theme.spacing(0.5),
    backgroundColor: alpha(theme.palette.background.main, 0.85),
  },
  main: {
    flexGrow: 1,
  },
}));

export default useStyles;

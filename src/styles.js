import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    padding: theme.spacing(0.5),
    backgroundColor: fade(theme.palette.background.main, 0.85),
  },
  main: {
    flexGrow: 1,
  },
}));

export default useStyles;

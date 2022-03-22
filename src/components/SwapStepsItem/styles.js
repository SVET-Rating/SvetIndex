import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.breakpoints.values.md,
    margin: '0 auto',
  },
}));

export default useStyles;

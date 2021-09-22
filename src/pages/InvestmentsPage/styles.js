import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: theme.breakpoints.values.md,
    margin: theme.spacing(2, 'auto'),
    gridGap: theme.spacing(2),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}));

export default useStyles;

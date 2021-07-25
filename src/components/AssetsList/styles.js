import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

export default useStyles;

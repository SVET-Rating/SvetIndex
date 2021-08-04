import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  address: {
    maxWidth: theme.spacing(35),
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;

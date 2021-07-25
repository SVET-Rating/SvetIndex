import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
  },
  ticket: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

export default useStyles;

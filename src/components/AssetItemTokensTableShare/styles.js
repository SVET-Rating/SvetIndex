import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
  },
  symbol: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  address: {
    minWidth: theme.spacing(25),
  },
  value: {
    paddingLeft: 'unset',
  }
}));

export default useStyles;

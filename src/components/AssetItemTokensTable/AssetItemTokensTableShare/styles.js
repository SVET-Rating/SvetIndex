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
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: theme.spacing(20),
    '& div': {
      fontSize: 'inherit',
      '& input': {
        fontSize: 'inherit',
      },
    },
  },
  amountValue: {
    paddingLeft: 'unset',
  },
  amountSymbol: {
    marginLeft: 0,
  },
}));

export default useStyles;

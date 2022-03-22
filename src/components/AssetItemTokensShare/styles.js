import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(8),
    padding: theme.spacing(0.5, 0.25),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
    background: theme.palette.background.linearGradient,
    borderRadius: theme.shape.borderRadius,
    userSelect: 'none',
  },
  icon: {
    marginBottom: theme.spacing(0.5),
  },
  amountValue: {
    paddingLeft: 'unset',
  },
  amountSymbol: {
    marginLeft: 0,
  },
}));

export default useStyles;

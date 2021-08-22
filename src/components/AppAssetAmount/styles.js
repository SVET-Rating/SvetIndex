import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(20),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    fontSize: 'inherit',
    lineHeight: 1,
  },
  amount: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  symbol: {
    flexShrink: 0,
    opacity: 0.5,
  },
}));

export default useStyles;

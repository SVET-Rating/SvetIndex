import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(20),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    font: 'inherit',
    lineHeight: 1,
  },
  amount: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    font: 'inherit',
  },
  symbol: {
    flexShrink: 0,
    opacity: 0.5,
    font: 'inherit',
  },
}));

export default useStyles;

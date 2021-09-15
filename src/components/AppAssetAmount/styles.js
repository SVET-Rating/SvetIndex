import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(20),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexWrap: 'nowrap',
    lineHeight: 1,
    userSelect: 'none',
    '& > *': {
      opacity: 0.5,
    }
  },
  amount: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'text',
    opacity: 1,
  },
  symbol: {
    flexShrink: 0,
  },
}));

export default useStyles;

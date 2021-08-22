import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${fade(theme.palette.text.corporate, 0.5)}`,
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  amount: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: 'inherit',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  balance: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  balanceAmount: {
    color: theme.palette.text.important,
  },
  maxButton: {},
}));

export default useStyles;

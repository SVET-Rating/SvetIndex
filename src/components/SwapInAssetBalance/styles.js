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
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  input: {
    flexShrink: 0,
    width: theme.spacing(15),
    marginLeft: theme.spacing(2),
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

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.background.secondary}`,
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    userSelect: 'none',
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
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '-moz-appearance': 'textfield',
    '&:hover, &:focus': {
      '-moz-appearance': 'number-input',
    },
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

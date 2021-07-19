import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
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
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(#383C47, #2C2F38)',
    color: theme.palette.common.white,
    fontSize: 'inherit',
    fontWeight: 700,
    textAlign: 'right',
  },
  balance: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > span': {
      color: theme.palette.primary.main,
    },
  },
  maxButton: {
    padding: theme.spacing(0, 0.5),
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;

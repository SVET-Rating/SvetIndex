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
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    minWidth: 'unset',
    padding: theme.spacing(0, 0.5),
    color: theme.palette.secondary.main,
    textTransform: 'none',
    '&:disabled': {
      opacity: 0.25,
      color: theme.palette.secondary.main,
    },
  },
}));

export default useStyles;

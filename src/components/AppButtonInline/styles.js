import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'unset',
    padding: theme.spacing(0, 0.5),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.main,
    textTransform: 'none',
    '&:disabled': {
      opacity: 0.25,
      color: theme.palette.secondary.main,
    },
  },
}));

export default useStyles;

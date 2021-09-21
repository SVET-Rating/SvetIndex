import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'unset',
    padding: theme.spacing(0, 0.5),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.corporate,
    textTransform: 'none',
    '&:disabled': {
      opacity: 0.25,
      color: theme.palette.text.corporate,
    },
  },
  button: {},
}));

export default useStyles;

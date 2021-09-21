import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    userSelect: 'none',
  },
  label: {
    color: 'inherit',
    cursor: 'pointer',
  },
  input: {
    width: theme.spacing(4),
    marginRight: theme.spacing(0.5),
  },
  infoButton: {
    padding: theme.spacing(0.5),
    '& svg': {
      width: '0.8em',
      height: '0.8em',
    },
  },
}));

export default useStyles;

import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    color: alpha(theme.palette.common.white, 0.5),
    fontSize: '0.8em',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'unset',
    },
  },
  infoButton: {
    padding: theme.spacing(0, 0.5),
    '& svg': {
      width: '0.7em',
      height: '0.7em',
    },
  },
  infoPaper: {
    maxWidth: 'unset',
    '& p': {
      fontSize: '0.8rem',
    },
  },
}));

export default useStyles;

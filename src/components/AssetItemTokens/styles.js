import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  list: {
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > li': {
      width: 'unset',
      padding: '0',
      margin: theme.spacing(0.25),
    },
  },
  text: {
    color: alpha(theme.palette.common.white, 0.5),
    textAlign: 'left',
    paddingLeft: theme.spacing(0.5),
    userSelect: 'none',
  },
  infoButton: {
    paddingBottom: theme.spacing(1),
  },
  infoPaper: {
    maxWidth: 'unset',
    width: theme.spacing(36.5),
  },
}));

export default useStyles;

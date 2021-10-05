import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    marginTop: 'auto !important',
    userSelect: 'none',
  },
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(0.5, 0),
  },
  blockPrice: {
    margin: theme.spacing(0.5, 0),
  },
  price: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    flexShrink: 0,
    color: theme.palette.common.white,
  },
  value: {
    marginLeft: 'auto',
    color: theme.palette.text.important,
  },
  divider: {
    backgroundColor: theme.palette.background.secondary,
  },
  infoButton: {
    '& svg': {
      width: '0.8em',
      height: '0.8em',
    },
  },
}));

export default useStyles;

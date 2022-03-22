import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  },
  text: {
    textAlign: 'left',
    color: theme.palette.common.white,
    '& > span': {
      color: alpha(theme.palette.common.white, 0.5),
    },
  },
  link: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.corporate,
  },
}));

export default useStyles;

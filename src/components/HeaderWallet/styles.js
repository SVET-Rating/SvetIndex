import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  },
  text: {
    color: fade(theme.palette.common.white, 0.5),
  },
  address: {
    maxWidth: theme.spacing(35),
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;

import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: fade(theme.palette.common.white, 0.5),
    userSelect: 'none',
  },
  address: {
    maxWidth: theme.spacing(35),
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;

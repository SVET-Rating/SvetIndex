import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {},
  record: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(0.5, 0),
  },
  text: {
    color: theme.palette.common.white,
  },
  value: {
    color: fade(theme.palette.common.white, 0.5),
  },
}));

export default useStyles;

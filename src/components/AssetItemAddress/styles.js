import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  },
  text: {
    textAlign: 'left',
    color: theme.palette.common.white,
  },
  link: {
    color: theme.palette.text.corporate,
  },
}));

export default useStyles;

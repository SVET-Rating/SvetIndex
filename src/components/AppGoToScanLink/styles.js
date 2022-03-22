import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  link : {
    display: 'inline-block',
    padding: theme.spacing(0.5),
    color: theme.palette.text.corporate,
  },
  icon: {},
}));

export default useStyles;

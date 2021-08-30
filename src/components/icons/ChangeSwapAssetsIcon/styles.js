import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(3),
    height: 'auto',
    '& path': {
      fill: theme.palette.text.corporate,
    },
  },
}));

export default useStyles;

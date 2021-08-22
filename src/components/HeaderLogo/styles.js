import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.corporate,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.linearGradient,
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[3],
  },
  table: {
    '& td': {
      padding: theme.spacing(0.5, 1.5),
    },
    '& td, & th': {
      color: theme.palette.common.white,
    },
  },
}));

export default useStyles;

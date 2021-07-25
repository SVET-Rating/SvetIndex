import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(#383C47, #2C2F38)',
    marginBottom: theme.spacing(2),
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

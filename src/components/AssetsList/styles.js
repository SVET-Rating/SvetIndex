import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > li': {
      margin: theme.spacing(2),
    },
  },
  rootLoading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: alpha(theme.palette.common.white, 0.5),
  },
  loader: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;

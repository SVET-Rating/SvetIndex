import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.spacing(20),
    padding: theme.spacing(1),
    color: alpha(theme.palette.common.white, 0.5),
    background: theme.palette.background.secondary,
    borderRadius: theme.shape.borderRadius,
    userSelect: 'none',
    '& p': {
      fontSize: '0.8rem',
    }
  },
}));

export default useStyles;

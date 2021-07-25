import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5, 3),
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(#383C47, #2C2F38)',
    '&:hover': {
      background: 'linear-gradient(#382586, #2C2F38)',
    },
  },
}));

export default useStyles;

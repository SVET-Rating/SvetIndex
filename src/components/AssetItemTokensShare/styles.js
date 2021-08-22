import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(8),
    padding: theme.spacing(0.5, 0.25),
    background: theme.palette.background.linearGradient,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    userSelect: 'none',
  },
  icon: {
    marginBottom: theme.spacing(0.5),
  },
  text: {
    color: theme.palette.common.white,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  icon: {
    flexShrink: 0,
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(0.5),
    borderRadius: '50%',
  },
  text: {
    color: theme.palette.common.white,
    fontSize: '1.875rem',
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default useStyles;

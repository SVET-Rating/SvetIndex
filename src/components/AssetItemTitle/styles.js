import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  text: {
    height: '2.2rem',
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

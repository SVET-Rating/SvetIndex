import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexShrink: 0,
    display: 'inline-block',
    borderRadius: '50%',
    userSelect: 'none',
  },
}));

export default useStyles;

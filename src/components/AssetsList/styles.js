import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // width: '100%',
    '& > li': {
      margin: theme.spacing(2),
    },
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  list: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > li': {
      width: 'unset',
      padding: '0',
      margin: theme.spacing(0.25),
    },
  },
  text: {
    color: theme.palette.common.white,
    textAlign: 'left',
    paddingLeft: theme.spacing(0.5),
  },
}));

export default useStyles;

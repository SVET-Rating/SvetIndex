import { makeStyles, fade } from '@material-ui/core/styles';

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
    color: fade(theme.palette.common.white, 0.5),
    textAlign: 'left',
    paddingLeft: theme.spacing(0.5),
  },
}));

export default useStyles;

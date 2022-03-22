import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.main,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loader: {
    marginLeft: theme.spacing(1),
  },
  menuButton: {
    marginLeft: theme.spacing(-1.5),
    marginRight: theme.spacing(2.5),
    color: theme.palette.common.white,
  },
}));

export default useStyles;

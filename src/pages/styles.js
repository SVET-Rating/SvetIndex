import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    width: '90%',
    margin: theme.spacing(2),
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(2),
    alignItems: 'start',
    justifyItems: 'center',
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      height: '2.5rem',
      border: 'none',
      color: theme.palette.common.white,
      background: 'linear-gradient(#383C47, #2C2F38)',
      pointerEvents: 'none',
    },
    '& div > button': {
      color: theme.palette.primary.main,
      background: 'linear-gradient(#383C47, #2C2F38)',
      '--main-color': 'linear-gradient(#383C47, #2C2F38)',
    },
  },
}));

export default useStyles;

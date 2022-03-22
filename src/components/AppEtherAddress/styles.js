import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& input': {
      height: '2.0rem',
      paddingLeft: 0,
      paddingRight: '5.0rem',
      border: 'none',
      color: theme.palette.common.white,
      background: theme.palette.background.main,
      boxShadow: 'none',
      pointerEvents: 'none',
    },
    '& > div': {
      marginRight: 0,
    },
    '& > div > button': {
      marginLeft: theme.spacing(0.5),
    },
    '& div > button': {
      color: theme.palette.text.corporate,
      background: theme.palette.background.main,
      '--main-color': theme.palette.background.main,
    },
  },
}));

export default useStyles;

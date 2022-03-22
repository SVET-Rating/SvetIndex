import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  list: {
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    '& > li': {
      width: 'unset',
      padding: '0',
      margin: theme.spacing(0.25),
    },
    overflowX: 'hidden',
  },
  text: {
    color: alpha(theme.palette.common.white, 0.5),
    textAlign: 'left',
    userSelect: 'none',
  },
  infoButton: {
    paddingBottom: theme.spacing(1),
  },
  infoPaper: {
    maxWidth: 'unset',
    width: theme.spacing(37),
    maxHeight: theme.spacing(27),
    padding: theme.spacing(0.5),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
      borderRadius:'2px',
    },
  },
}));

export default useStyles;

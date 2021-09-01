import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    position: 'relative',
    height: theme.spacing(5),
    width: theme.spacing(5),
    borderRadius: '50%',
    perspective: '800px',
    // color: theme.palette.text.corporate,
  },
  orbit: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',

    '&:nth-child(1)': {
      left: '0%',
      top: '0%',
      animation: 'orbit-spinner-orbit-one-animation 1200ms linear infinite',
      borderBottom: '3px solid #ff1d5e',
    },

    '&:nth-child(2)': {
      right: '0%',
      top: '0%',
      animation: 'orbit-spinner-orbit-two-animation 1200ms linear infinite',
      borderRight: '3px solid #ff1d5e',
    },

    '&:nth-child(3)': {
      right: '0%',
      bottom: '0%',
      animation: 'orbit-spinner-orbit-three-animation 1200ms linear infinite',
      borderTop: '3px solid #ff1d5e',
    },
  },
}));

export default useStyles;

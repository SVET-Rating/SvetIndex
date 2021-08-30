import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   padding: theme.spacing(0.5),
  //   border: 'none',
  //   borderRadius: theme.shape.borderRadius,
  //   background: theme.palette.background.linearGradient,
  //   color: theme.palette.common.white,
  //   fontSize: 'inherit',
  //   fontWeight: 700,
  //   textAlign: 'right',
  // },
  root: {
    width: '100%',
  },
  stepper: {
    // marginRight: '10px',
    // color: 'white',
    // backgroundColor: '#119a1199',
    // border: '1px solid',
    // minWidth: '7rem',
    // '&:hover': {
    //     backgroundColor: '#9a8f11b0',
    //     color: '#FFF'
    //   }
  },
  step: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    // textAlign: 'center',
    // fontSize: '45px',
    // color: '#929191'
  },
  label: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
}));

export default useStyles;

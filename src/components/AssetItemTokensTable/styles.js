import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  table: {
    width: 'unset',
    '& .MuiTableCell-root': {
      borderColor: theme.palette.background.secondary,
      padding: theme.spacing(0.5, 1),
      color: theme.palette.common.white,
    },
    '& th.MuiTableCell-root': {
      padding: theme.spacing(1.5, 1),
      color: alpha(theme.palette.common.white, 0.5),
      fontSize: '0.75em',
      lineHeight: 1,
      '& > p': {
        fontSize: 'inherit',
        display: 'inline-flex',
        alignItems: 'center',
      },
    },
  },
  tableHeader: {
    userSelect: 'none',
  },
  infoButton: {
    padding: theme.spacing(0, 0, 0, 0.5),
    '& svg': {
      width: '0.7em',
      height: '0.7em',
    },
  },
}));

export default useStyles;

import { makeStyles, fade } from '@material-ui/core/styles';

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
      padding: theme.spacing(1.5),
      color: fade(theme.palette.common.white, 0.5),
      fontSize: '0.875em',
      lineHeight: 1,
    },
  },
  tableHeader: {
    userSelect: 'none',
  },
}));

export default useStyles;

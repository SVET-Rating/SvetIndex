import React from 'react';
import { connect } from 'react-redux';
import PageviewIcon from '@material-ui/icons/Pageview';
import * as s from '../../ethvtx_config/selectors/selectors';
import useStyles from './styles';

const AppGoToScanLink = ({
  address,
  explorerUrl,
  classes: {
    button: classNameButton = '',
    link: classNameLink = '',
    icon: classNameIcon = '',
  } = {},
}) => {
  const classes = useStyles();

  if (!explorerUrl) {
    return null;
  }

  const href = address
    ? `${explorerUrl}/address/${address}`
    : explorerUrl

  return (
    <span className={`${classes.root} ${classNameButton}`}>
      <a className={`${classes.link} ${classNameLink}`}
        href={href}
        target="_blank"
      >
        <PageviewIcon className={`${classes.icon} ${classNameIcon}`} />
      </a>
    </span>
  );
}

const mapStateToProps = (state) => ({
  explorerUrl: s.selectExplorerUrl(state),
});

export default connect(mapStateToProps)(AppGoToScanLink);

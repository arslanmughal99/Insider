/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, IconButton, Typography, List, Divider } from '@material-ui/core';
import { AmpStories, KeyboardBackspaceRounded } from '@material-ui/icons';
import IfaceList from './ifacelist/IfaceList';
import { getIfaces, getStoredIface } from '../../services/configstore';
import styles from './Settings.css';

class Settings extends Component {
  state = {
    ifaces: [],
    activeIface: ''
  };

  componentWillMount() {
    getIfaces().then(ifaceList => {
      this.setState({ ifaces: ifaceList, activeIface: getStoredIface() || '' });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Paper elevation={0} className={styles.mainPaper} square>
          <div className={styles.mainWrapper}>
            <div className={styles.topBar}>
              <div className={styles.flexBox}>
                <div>
                  <AmpStories />
                </div>
                <div>
                  <Typography variant="subtitle2">insider</Typography>
                </div>
              </div>
              <div>
                <Link to="/">
                  <IconButton size="small">
                    <KeyboardBackspaceRounded fontSize="small" />
                  </IconButton>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.headingSec}>
            <Typography variant="subtitle1">Select Interface</Typography>
            <div className={styles.divider}>
              <Divider />
            </div>
          </div>
          <div className={styles.listSection}>
            <List dense disablePadding>
              <IfaceList
                ifacesList={this.state.ifaces}
                activeIface={this.state.activeIface}
              />
            </List>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

export default Settings;

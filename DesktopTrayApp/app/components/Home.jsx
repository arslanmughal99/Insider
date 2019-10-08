/* eslint-disable jsx-a11y/accessible-emoji */

import React, { Component } from 'react';
import { createHashHistory } from 'history';
import { Link } from 'react-router-dom';
import { Paper, Typography, IconButton } from '@material-ui/core';
// $FlowFixMe
import { AmpStories, SettingsOutlined } from '@material-ui/icons';
import styles from './Home.css';
import DoorIcon from '../assets/dooricon.png';
import { ipcRenderer } from 'electron';

type Props = {};
type State = {
  status: string;
}

export default class Home extends Component<Props, State> {
  constructor() {
    super()
    this.delta = this.delta.bind(this);
    this.callForOpen = this.callForOpen.bind(this);
  }

  props: Props;

  state: State = {
    status: ' '
  }

  delta(status) {
    // $FlowFixMe
    this.setState({status: status});
    setTimeout(() => {this.setState({status: ''});}, 2000);
  }

  // $FlowFixMe
  callForOpen() {
    ipcRenderer.send('call-for-door');
    ipcRenderer.once('call-foor-door-status', (e, status) => {
      switch (status) {
        case 'OPEN_SUCESS':
          this.delta('Done 🔓');
          break;
        case 'NOT_RESPONDING':
          this.delta('Not Responding ⏳');
          break;
        case 'CONFILIC':
          this.delta('Confilic 🦀');
          break;
        case 'SOMETHING_WENT_WRONG':
          this.delta('Something went wrong 😢');
          break;
        case 'NO_INTERFACE_CONNECTED':
          this.delta('No interface connected 🔌');
          break;
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <Paper className={styles.mainPaper} elevation={0} square>
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
                <Link to="/settings">
                  <IconButton size="small">
                    <SettingsOutlined fontSize="small" />
                  </IconButton>
                </Link>
              </div>
            </div>
            <div className={styles.mainDiv}>
              <Typography variant="h6" className={styles.fontFamily}>
                Open Door
              </Typography>
              <IconButton onClick={this.callForOpen}>
                <img src={DoorIcon} className={styles.doorIcon} alt="door" />
              </IconButton>
            </div>
          </div>
          <div className={styles.statusSection}>
            <Typography variant="subtitle1"> {this.state.status || ''} </Typography>
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

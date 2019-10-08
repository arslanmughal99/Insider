/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper
} from '@material-ui/core';
import { WifiRounded, CheckCircle } from '@material-ui/icons';
import { saveIface } from '../../../services/configstore';
import styles from './IfaceList.css';



function setIface(name) {
  const history = createHashHistory();
  saveIface(name);
  history.push('/');
}

const IfaceList = props => {
  const ifaceList = props.ifacesList;
  const activeIface = props.activeIface;
  return ifaceList.map((iface, index) => (
    <ListItem button key={index} onClick={() => {setIface(iface.name)}}>
      <ListItemIcon>
        <WifiRounded />
      </ListItemIcon>
      <ListItemText
        primary={`${iface.name.substring(0, 18)} ${
          iface.name.length > 18 ? '...' : ''
        }`}
        secondary={iface.addr}
      />
      {iface.name === activeIface ? (
        <ListItemSecondaryAction>
          <CheckCircle />
        </ListItemSecondaryAction>
      ) : (
        ''
      )}
    </ListItem>
  ));
};

export default IfaceList;

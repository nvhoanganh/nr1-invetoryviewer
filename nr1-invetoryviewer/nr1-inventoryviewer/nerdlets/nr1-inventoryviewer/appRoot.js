import React, { useState, useEffect, useContext } from 'react';
import {
  NerdGraphQuery, PlatformStateContext, NerdletStateContext, nerdlet,
  Stack,
  StackItem,
  HeadingText,
  Layout,
  LayoutItem,
  EmptyState,
  BlockText,
  Popover,
  PopoverBody,
  PopoverTrigger,
  Icon,
  Button,
  AccountPicker
} from 'nr1';

import { DataContext } from './index'

function AppRoot() {
  const { accounts } = useContext(DataContext);
  console.log("🚀 ~ file: index.js ~ line 52 ~ DataProvider ~ accounts", accounts)
  return (<div>
    Inventory Viewer app
  </div>)
}

export default AppRoot;
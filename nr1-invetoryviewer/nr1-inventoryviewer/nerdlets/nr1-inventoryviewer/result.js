import React, { useState, useEffect, useContext } from 'react';
import {
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

function DisplayResult({ scanResult }) {
  return <pre>{JSON.stringify(scanResult, null, 2)}</pre>
}

export default DisplayResult;
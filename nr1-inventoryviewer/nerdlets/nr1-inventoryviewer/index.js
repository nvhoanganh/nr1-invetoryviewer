import React, { useEffect, useContext } from 'react';
import {
  PlatformStateContext, NerdletStateContext, nerdlet, Icon
} from 'nr1';
import { accountsQuery } from './queries';
import AppRoot from './appRoot';
import DataProvider from './data';

function NerdletRoot() {
  useEffect(() => {
    nerdlet.setConfig({
      accountPicker: false,
      timePicker: false,
      actionControls: true,
      actionControlButtons: [
        {
          label: 'New Issue',
          type: 'secondary',
          iconType: Icon.TYPE.INTERFACE__SIGN__EXCLAMATION,
          onClick: () =>
            window.open(
              'https://github.com/nvhoanganh/nr1-invetoryviewer/issues/new?assignees=&labels=bug%2C+needs-triage&template=bug_report.md&title=',
              '_blank'
            )
        },
        {
          label: 'Feature Request',
          type: 'secondary',
          iconType: Icon.TYPE.PROFILES__EVENTS__FAVORITE__WEIGHT_BOLD,
          onClick: () =>
            window.open(
              'https://github.com/nvhoanganh/nr1-invetoryviewer/issues/new?assignees=&labels=enhancement%2C+needs-triage&template=enhancement.md&title=',
              '_blank'
            )
        }
      ]
    });
  }, []);

  const platformContext = useContext(PlatformStateContext);
  const nerdletContext = useContext(NerdletStateContext);

  return (
    <div>
      <DataProvider {...platformContext} {...nerdletContext}>
        <AppRoot />
      </DataProvider>
    </div>
  );
}

export default NerdletRoot;

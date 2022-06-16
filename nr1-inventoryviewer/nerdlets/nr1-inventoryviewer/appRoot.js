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

import { DataContext } from './data'
import DisplayResult from './result'

function AppRoot() {
  const {
    accounts,
    scanning,
    setRootState,
    selectedAccountId,
    appsScanned,
    scanComplete,
    scanAccount,
    scanAll,
    scanResult
  } = useContext(DataContext);

  return (
    <div>
      <Layout style={{ paddingLeft: '10px', paddingTop: '5px' }}>
        <LayoutItem>
          <Stack directionType={Stack.DIRECTION_TYPE.VERTICAL} fullWidth>
            <StackItem style={{ marginBottom: '5px' }}>
              <HeadingText
                style={{ marginBottom: '5px' }}
                type={HeadingText.TYPE.HEADING_3}
              >
                Select account to scan
              </HeadingText>

              <AccountPicker
                value={selectedAccountId}
                onChange={(e, selectedAccountId) =>
                  setRootState(curr => ({ ...curr, selectedAccountId }))
                }
              />
              &nbsp;
              <Button
                type={Button.TYPE.PRIMARY}
                sizeType={Button.SIZE_TYPE.SMALL}
                disabled={!selectedAccountId || scanning}
                onClick={() => scanAccount(selectedAccountId)}
              >
                Scan selected
              </Button>
              &nbsp;
              {
                accounts?.length
                && <Button
                  type={Button.TYPE.PRIMARY}
                  disabled={scanning}
                  sizeType={Button.SIZE_TYPE.SMALL}
                  onClick={scanAll}
                >
                  Scan {accounts?.length} accounts
                </Button>
              }

            </StackItem>
            {scanning && (
              <StackItem style={{ width: '100%' }}>
                {scanning && <EmptyState
                  title="Fetching inventory data..."
                  description={`${appsScanned || 0} apps scanned`}
                  type={EmptyState.TYPE.LOADING}
                />}
              </StackItem>
            )}
          </Stack>
          {!scanning && scanComplete && (
            <DisplayResult scanResult={scanResult} />
          )}
        </LayoutItem>
      </Layout>
    </div >
  );
}

export default AppRoot;
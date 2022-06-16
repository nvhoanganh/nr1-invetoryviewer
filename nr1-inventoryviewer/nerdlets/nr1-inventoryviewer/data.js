import React, { useState, useEffect, useContext } from 'react';
import { NerdGraphQuery } from 'nr1';
import { accountsQuery, getEnvironmentsQuery } from './queries';

export const DataContext = React.createContext();

function DataProvider({ children }) {
  const [rootState, setRootState] = useState({});

  useEffect(() => {
    NerdGraphQuery.query({ query: accountsQuery }).then(value => {
      const accounts = value?.data?.actor?.accounts || [];
      setRootState(curr => ({ ...curr, accounts }));
    });
  }, []);

  async function getEnvironmentAttributes(accountId, setRootState) {
    let hasNext = true;
    let results = [];
    let nextCursor = '';
    let keys = [];
    do {
      const result = await NerdGraphQuery.query({ query: getEnvironmentsQuery(accountId, nextCursor) });
      const records = result.data.actor.account.agentEnvironment.environmentAttributes.results.map(x => ({
        guid: x.applicationGuids[0],
        ...x.details,
        name: x.details.name,
        ...x.attributes.reduce((prev, curr) => {
          if (keys.indexOf(curr.attribute) < 0) {
            keys.push(curr.attribute)
          }

          return {
            ...prev,
            [curr.attribute]: curr.value.replaceAll('\n', '').replaceAll('"', ''),
          }
        }, {})
      }));

      results = [
        ...results,
        ...records
      ];

      setRootState(curr => ({
        ...curr,
        appsScanned: curr.appsScanned + records.length,
      }));

      nextCursor = result.data.actor.account.agentEnvironment.environmentAttributes.nextCursor;
      hasNext = !!nextCursor;
    } while (hasNext);


    const flatten = results.map(x => {
      let obj = {
        guid: x.guid,
        name: x.name,
        host: x.host,
        language: x.language,
        id: x.id,
      };

      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        obj = {
          ...obj,
          [key]: x[key] || null
        }
      }

      return obj;
    });

    return flatten;
  }

  const scanAccount = async (accountId) => {
    setRootState(curr => ({
      ...curr,
      scanning: true,
      appsScanned: 0,
      scanComplete: false
    }));

    const result = await getEnvironmentAttributes(accountId, setRootState);

    setRootState(curr => ({
      ...curr,
      scanning: false,
      scanComplete: true,
      scanResult: result.map(x => ({
        ...x,
        accountId: accountId
      }))
    }));
  };

  const scanAll = async () => {
    setRootState(curr => ({
      ...curr,
      scanning: true,
      appsScanned: 0,
      scanComplete: false
    }));

    let results = [];
    for (let index = 0; index < rootState.accounts.length; index++) {
      const acc = rootState.accounts[index];
      console.log(`scanning account ${acc.id}`);
      const result = await getEnvironmentAttributes(acc.id, setRootState);
      const withAccId = result.map(x => ({
        ...x,
        accountId: acc.id
      }));

      results = [
        ...results,
        ...withAccId
      ];
    }

    setRootState(curr => ({
      ...curr,
      scanning: false,
      scanComplete: true,
      scanResult: results
    }));
  };

  return (
    <DataContext.Provider
      value={{
        ...rootState,
        setRootState,
        scanAccount: scanAccount,
        scanAll: scanAll
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
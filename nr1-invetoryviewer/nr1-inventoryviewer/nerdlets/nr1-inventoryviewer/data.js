import React, { useState, useEffect, useContext } from 'react';
import { NerdGraphQuery } from 'nr1';
import { accountsQuery } from './queries';

export const DataContext = React.createContext();

function DataProvider({ children }) {
  const [rootState, setRootState] = useState({});

  useEffect(() => {
    console.log('loading accounts...');
    NerdGraphQuery.query({ query: accountsQuery }).then(value => {
      const accounts = value?.data?.actor?.accounts || [];
      setRootState(curr => ({ ...curr, accounts }));
    });
  }, []);

  const scanAccount = async (accountId) => {
    setRootState(curr => ({ ...curr, scanning: true }));
    console.log("🚀 ~ file: index.js ~ line 78 ~ scanAccount ~ accountId", accountId)
    setTimeout(() => {
      setRootState(curr => ({ ...curr, scanning: false }));
    }, 3000);
  };

  return (
    <DataContext.Provider
      value={{
        ...rootState,
        setRootState,
        scanAccount: scanAccount
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
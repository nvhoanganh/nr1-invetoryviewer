import { ngql } from 'nr1';

export const accountsQuery = ngql`{
  actor {
    accounts {
      id
      name
      reportingEventTypes
    }
  }
}`;

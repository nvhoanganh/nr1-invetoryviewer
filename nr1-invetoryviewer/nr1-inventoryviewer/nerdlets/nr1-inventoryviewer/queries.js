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


export const getEnvironmentsQuery = (accountId, nextCursor) => ngql`{
  actor {
    account(id: ${accountId}) {
      agentEnvironment {
        environmentAttributes (filter: {contains: "Version"}, cursor: "${nextCursor}"){
          nextCursor
          results {
            attributes {
              attribute
              value
            }
            details {
              name
              host
              language
              id
            }
            applicationGuids
          }
        }
      }
    }
  }
}`;

import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      fullName
      email
      ssn
      locale
    }
  }
`;

export const GET_CLIENT = gql`
  query GetClient($clientId: ID!) {
    client(id: $clientId) {
      id
      fullName
      email
      ssn
      locale
      accounts {
        id
        name
        type
        clientId
        currency
        assets {
          ticker
          quantity
          latestPrice
          marketIsoCode
        }
      }
    }
  }
`;

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
  query GetClient($clientId: ID!, $currency: String) {
    client(id: $clientId) {
      id
      fullName
      email
      ssn
      locale
      totalEquity(currency: $currency)
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

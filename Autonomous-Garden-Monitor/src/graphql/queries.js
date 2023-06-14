/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGardenDatabase = /* GraphQL */ `
  query GetGardenDatabase($id: ID!) {
    getGardenDatabase(id: $id) {
      Garden_Id
      Diseased
      Label
      id
      createdAt
      updatedAt
    }
  }
`;
export const listGardenDatabases = /* GraphQL */ `
  query ListGardenDatabases(
    $filter: ModelGardenDatabaseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGardenDatabases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        Garden_Id
        Diseased
        Label
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

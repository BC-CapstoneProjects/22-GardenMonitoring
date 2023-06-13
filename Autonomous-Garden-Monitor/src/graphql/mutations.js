/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGardenDatabase = /* GraphQL */ `
  mutation CreateGardenDatabase(
    $input: CreateGardenDatabaseInput!
    $condition: ModelGardenDatabaseConditionInput
  ) {
    createGardenDatabase(input: $input, condition: $condition) {
      Garden_Id
      Diseased
      Label
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateGardenDatabase = /* GraphQL */ `
  mutation UpdateGardenDatabase(
    $input: UpdateGardenDatabaseInput!
    $condition: ModelGardenDatabaseConditionInput
  ) {
    updateGardenDatabase(input: $input, condition: $condition) {
      Garden_Id
      Diseased
      Label
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteGardenDatabase = /* GraphQL */ `
  mutation DeleteGardenDatabase(
    $input: DeleteGardenDatabaseInput!
    $condition: ModelGardenDatabaseConditionInput
  ) {
    deleteGardenDatabase(input: $input, condition: $condition) {
      Garden_Id
      Diseased
      Label
      id
      createdAt
      updatedAt
    }
  }
`;

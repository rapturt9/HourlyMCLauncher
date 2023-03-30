/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $user: String
    $domain: [String]
    $status: [Int]
    $credit: Float
  ) {
    onCreateUser(
      user: $user
      domain: $domain
      status: $status
      credit: $credit
    ) {
      user
      domain
      status
      credit
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $user: String
  ) {
    onUpdateUser(
      user: $user
    ) {
      user
      domain
      status
      credit
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $user: String
    $domain: [String]
    $status: [Int]
    $credit: Float
  ) {
    onDeleteUser(
      user: $user
      domain: $domain
      status: $status
      credit: $credit
    ) {
      user
      domain
      status
      credit
    }
  }
`;

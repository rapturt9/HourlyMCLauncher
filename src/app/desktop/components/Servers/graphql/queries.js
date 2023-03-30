/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($user: String!) {
    getUser(user: $user) {
      user
      domain
      status
      credit
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: TableUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user
        domain
        status
        credit
      }
      nextToken
    }
  }
`;

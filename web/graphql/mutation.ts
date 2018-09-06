import gql from 'graphql-tag';

export const LIKE_SESSION_MUTATION = gql`
  mutation LikeSesstion($randomID: String!, $sessionID: ID!) {
    createLike(input: { clientMutationId: $randomID, sessionID: $sessionID }) {
      clientMutationId
      like {
        id
        sessionID
      }
    }
  }
`;

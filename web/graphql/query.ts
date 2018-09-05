import gql from 'graphql-tag';

export const SESSIONS_QUERY = gql`
  query AllSessions {
    sessions(first: 0) {
      nodes {
        id
        place
        title
        titleJa
        type
        tags
        startTime
        endTime
        outline
        outlineJa
        lang
        tags
        speakers {
          id
          speakerId
          name
          nameJa
          position
          positionJa
        }
      }
    }
  }
`;

import gql from 'graphql-tag';

export const SESSIONS_QUERY = gql`
  query AllSessions {
    sessions(first: 0) {
      nodes {
        id
        sessionId
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

export const NEWS_QUERY = gql`
  query NewsQuery {
    news {
      id
      date
      message
      messageJa
      link
    }
  }
`;

export const SPEAKER_FRAGMENT = gql`
  fragment SpeakerFragment on Speaker {
    id
    speakerId
    name
    nameJa
    position
    positionJa
    profile
    profileJa
  }
`;

export const SESSION_FRAGMENT = gql`
  fragment SessionFragment on Session {
    startTime
    endTime
    type
    place
    title
    titleJa
    tags
    outline
    outlineJa
    speakers {
      ...SpeakerFragment
    }
  }
  ${SPEAKER_FRAGMENT}
`;

export const SESSION_QUERY = gql`
  query Session($sessionId: Int!) {
    session(sessionId: $sessionId) {
      id
      sessionId
      ...SessionFragment
    }
  }
  ${SESSION_FRAGMENT}
`;

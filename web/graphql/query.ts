import gql from 'graphql-tag';

export const CONTENT_GRID_SESSION_FRAGMENT = gql`
  fragment ContentGridSessionFragment on Session {
    startTime
    endTime
    type
    place
    outline
    outlineJa
  }
`;

export const TIMETABLE_SESSION_FRAGMENT = gql`
  fragment TimeTableSessionFragment on Session {
    id
    sessionId
    lang
    tags
    title
    titleJa
  }
`;

export const CONTENT_GRID_SPEAKER_FRAGMENT = gql`
  fragment ContentGridSpeakerFragment on Speaker {
    id
    speakerId
    position
    positionJa
  }
`;

export const TIMETABLE_SPEAKER_FRAGMENT = gql`
  fragment TimeTableSpeakerFragment on Speaker {
    name
    nameJa
  }
`;

export const SESSIONS_QUERY = gql`
  query AllSessions {
    sessionList {
      nodes {
        id
        sessionId
        ...ContentGridSessionFragment
        ...TimeTableSessionFragment
        speakers {
          ...ContentGridSpeakerFragment
          ...TimeTableSpeakerFragment
        }
      }
    }
  }
  ${CONTENT_GRID_SESSION_FRAGMENT}
  ${TIMETABLE_SESSION_FRAGMENT}
  ${CONTENT_GRID_SPEAKER_FRAGMENT}
  ${TIMETABLE_SPEAKER_FRAGMENT}
`;

export const NEWS_QUERY = gql`
  query NewsQuery {
    newsList {
      nodes {
        id
        date
        message
        messageJa
        link
      }
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

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Session
// ====================================================

export interface Session_session_speakers_slides_session {
  __typename: "Session";
  sessionId: number;
}

export interface Session_session_speakers_slides {
  __typename: "Slide";
  id: string;
  lang: string;
  url: string;
  session: Session_session_speakers_slides_session;
}

export interface Session_session_speakers_movies_session {
  __typename: "Session";
  sessionId: number;
}

export interface Session_session_speakers_movies {
  __typename: "Movie";
  id: string;
  url: string;
  session: Session_session_speakers_movies_session;
}

export interface Session_session_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
  profile: string;
  profileJa: string;
  slides: Session_session_speakers_slides[];
  movies: Session_session_speakers_movies[];
}

export interface Session_session {
  __typename: "Session";
  title: string;
  titleJa: string;
  sessionId: number;
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  tags: string[];
  outline: string;
  outlineJa: string;
  speakers: Session_session_speakers[];
}

export interface Session {
  /**
   * セッションを取得します。
   */
  session: Session_session | null;
}

export interface SessionVariables {
  sessionId: number;
}

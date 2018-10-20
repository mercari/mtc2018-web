/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Session
// ====================================================

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
}

export interface Session_session {
  __typename: "Session";
  title: string;
  titleJa: string;
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  tags: string[];
  outline: string;
  outlineJa: string;
  slideUrl: string;
  movieUrl: string;
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

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllSessions
// ====================================================

export interface AllSessions_sessions_nodes_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  position: string;
  positionJa: string;
  name: string;
  nameJa: string;
}

export interface AllSessions_sessions_nodes {
  __typename: "Session";
  id: string;
  sessionId: number;
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  outline: string;
  outlineJa: string;
  lang: string;
  tags: string[];
  title: string;
  titleJa: string;
  speakers: AllSessions_sessions_nodes_speakers[];
}

export interface AllSessions_sessions {
  __typename: "SessionConnection";
  nodes: AllSessions_sessions_nodes[];
}

export interface AllSessions {
  /**
   * セッション一覧を取得します。
   */
  sessions: AllSessions_sessions;
}

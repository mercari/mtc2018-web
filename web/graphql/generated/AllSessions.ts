/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllSessions
// ====================================================

export interface AllSessions_sessions_nodes_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
}

export interface AllSessions_sessions_nodes {
  __typename: "Session";
  id: string;
  place: string;
  title: string;
  titleJa: string;
  type: string;
  tags: string[] | null;
  startTime: string;
  endTime: string;
  outline: string;
  outlineJa: string;
  lang: string;
  speakers: AllSessions_sessions_nodes_speakers[] | null;
}

export interface AllSessions_sessions {
  __typename: "SessionConnection";
  nodes: (AllSessions_sessions_nodes | null)[] | null;
}

export interface AllSessions {
  /**
   * セッション一覧を取得します。
   */
  sessions: AllSessions_sessions;
}

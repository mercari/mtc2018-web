/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllSessions
// ====================================================

export interface AllSessions_sessionList_nodes_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
}

export interface AllSessions_sessionList_nodes {
  __typename: "Session";
  id: string;
  sessionId: number;
  title: string;
  titleJa: string;
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  outline: string;
  outlineJa: string;
  tags: string[];
  speakers: AllSessions_sessionList_nodes_speakers[];
  lang: string;
}

export interface AllSessions_sessionList {
  __typename: "SessionConnection";
  nodes: AllSessions_sessionList_nodes[];
}

export interface AllSessions {
  /**
   * セッション一覧を取得します。
   */
  sessionList: AllSessions_sessionList;
}

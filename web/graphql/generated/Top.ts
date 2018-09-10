/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Top
// ====================================================

export interface Top_newsList_nodes {
  __typename: "News";
  id: string;
  date: string;
  message: string;
  messageJa: string;
  link: string | null;
}

export interface Top_newsList {
  __typename: "NewsConnection";
  nodes: Top_newsList_nodes[];
}

export interface Top_sessionList_nodes_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
}

export interface Top_sessionList_nodes {
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
  speakers: Top_sessionList_nodes_speakers[];
  lang: string;
}

export interface Top_sessionList {
  __typename: "SessionConnection";
  nodes: Top_sessionList_nodes[];
}

export interface Top {
  __typename: "Query";
  /**
   * お知らせ一覧を取得します
   */
  newsList: Top_newsList;
  /**
   * セッション一覧を取得します。
   */
  sessionList: Top_sessionList;
}

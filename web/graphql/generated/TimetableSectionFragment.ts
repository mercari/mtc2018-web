/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TimetableSectionFragment
// ====================================================

export interface TimetableSectionFragment_sessionList_nodes_speakers {
  __typename: "Speaker";
  name: string;
  nameJa: string;
}

export interface TimetableSectionFragment_sessionList_nodes {
  __typename: "Session";
  id: string;
  sessionId: number;
  lang: string;
  tags: string[];
  title: string;
  titleJa: string;
  speakers: TimetableSectionFragment_sessionList_nodes_speakers[];
}

export interface TimetableSectionFragment_sessionList {
  __typename: "SessionConnection";
  nodes: TimetableSectionFragment_sessionList_nodes[];
}

export interface TimetableSectionFragment {
  __typename: "Query";
  /**
   * セッション一覧を取得します。
   */
  sessionList: TimetableSectionFragment_sessionList;
}

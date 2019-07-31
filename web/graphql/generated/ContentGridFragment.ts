/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentGridFragment
// ====================================================

export interface ContentGridFragment_sessionList_nodes_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
}

export interface ContentGridFragment_sessionList_nodes {
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
  speakers: ContentGridFragment_sessionList_nodes_speakers[];
}

export interface ContentGridFragment_sessionList {
  __typename: "SessionConnection";
  nodes: ContentGridFragment_sessionList_nodes[];
}

export interface ContentGridFragment {
  __typename: "Query";
  /**
   * セッション一覧を取得します。
   */
  sessionList: ContentGridFragment_sessionList;
}

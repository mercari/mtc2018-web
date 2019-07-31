/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TimetableRowFragment
// ====================================================

export interface TimetableRowFragment_nodes_speakers {
  __typename: "Speaker";
  name: string;
  nameJa: string;
}

export interface TimetableRowFragment_nodes {
  __typename: "Session";
  id: string;
  sessionId: number;
  lang: string;
  tags: string[];
  title: string;
  titleJa: string;
  speakers: TimetableRowFragment_nodes_speakers[];
}

export interface TimetableRowFragment {
  __typename: "SessionConnection";
  nodes: TimetableRowFragment_nodes[];
}

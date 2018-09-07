/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentGridSessionFragment
// ====================================================

export interface ContentGridSessionFragment_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
}

export interface ContentGridSessionFragment {
  __typename: "Session";
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
  speakers: ContentGridSessionFragment_speakers[];
}

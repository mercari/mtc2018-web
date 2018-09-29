/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentGridItemFragment
// ====================================================

export interface ContentGridItemFragment_speakers {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
}

export interface ContentGridItemFragment {
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
  speakers: ContentGridItemFragment_speakers[];
}

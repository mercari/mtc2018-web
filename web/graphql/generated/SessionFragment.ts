/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SessionFragment
// ====================================================

export interface SessionFragment_speakers {
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

export interface SessionFragment {
  __typename: "Session";
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  title: string;
  titleJa: string;
  tags: string[] | null;
  outline: string;
  outlineJa: string;
  speakers: SessionFragment_speakers[] | null;
}

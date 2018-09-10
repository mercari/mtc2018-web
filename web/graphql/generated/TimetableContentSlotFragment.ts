/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TimetableContentSlotFragment
// ====================================================

export interface TimetableContentSlotFragment_speakers {
  __typename: "Speaker";
  name: string;
  nameJa: string;
}

export interface TimetableContentSlotFragment {
  __typename: "Session";
  id: string;
  sessionId: number;
  lang: string;
  tags: string[];
  title: string;
  titleJa: string;
  speakers: TimetableContentSlotFragment_speakers[];
}

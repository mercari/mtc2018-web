/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentCardFragment
// ====================================================

export interface ContentCardFragment_speakers {
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

export interface ContentCardFragment {
  __typename: "Session";
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  title: string;
  titleJa: string;
  tags: string[];
  outline: string;
  outlineJa: string;
  slideUrl: string;
  movieUrl: string;
  speakers: ContentCardFragment_speakers[];
}

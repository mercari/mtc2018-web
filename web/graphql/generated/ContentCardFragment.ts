/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentCardFragment
// ====================================================

export interface ContentCardFragment_speakers_slides_session {
  __typename: "Session";
  sessionId: number;
}

export interface ContentCardFragment_speakers_slides {
  __typename: "Slide";
  id: string;
  lang: string;
  url: string;
  session: ContentCardFragment_speakers_slides_session;
}

export interface ContentCardFragment_speakers_movies_session {
  __typename: "Session";
  sessionId: number;
}

export interface ContentCardFragment_speakers_movies {
  __typename: "Movie";
  id: string;
  url: string;
  session: ContentCardFragment_speakers_movies_session;
}

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
  slides: ContentCardFragment_speakers_slides[];
  movies: ContentCardFragment_speakers_movies[];
}

export interface ContentCardFragment {
  __typename: "Session";
  sessionId: number;
  startTime: string;
  endTime: string;
  type: string;
  place: string;
  title: string;
  titleJa: string;
  tags: string[];
  outline: string;
  outlineJa: string;
  speakers: ContentCardFragment_speakers[];
}

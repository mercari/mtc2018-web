/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ContentCardSpeakerFragment
// ====================================================

export interface ContentCardSpeakerFragment_slides_session {
  __typename: "Session";
  sessionId: number;
}

export interface ContentCardSpeakerFragment_slides {
  __typename: "Slide";
  id: string;
  lang: string;
  url: string;
  session: ContentCardSpeakerFragment_slides_session;
}

export interface ContentCardSpeakerFragment_movies_session {
  __typename: "Session";
  sessionId: number;
}

export interface ContentCardSpeakerFragment_movies {
  __typename: "Movie";
  id: string;
  url: string;
  session: ContentCardSpeakerFragment_movies_session;
}

export interface ContentCardSpeakerFragment {
  __typename: "Speaker";
  id: string;
  speakerId: string;
  name: string;
  nameJa: string;
  position: string;
  positionJa: string;
  profile: string;
  profileJa: string;
  slides: ContentCardSpeakerFragment_slides[];
  movies: ContentCardSpeakerFragment_movies[];
}

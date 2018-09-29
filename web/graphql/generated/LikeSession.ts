/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LikeSession
// ====================================================

export interface LikeSession_createLike_like_session {
  __typename: "Session";
  id: string;
  liked: number;
}

export interface LikeSession_createLike_like {
  __typename: "Like";
  id: string;
  session: LikeSession_createLike_like_session;
}

export interface LikeSession_createLike {
  __typename: "CreateLikePayload";
  clientMutationId: string | null;
  like: LikeSession_createLike_like;
}

export interface LikeSession {
  /**
   * セッションに対していいね！することができます。
   * ログイン周りのシステムはないので、リクエストにUUIDを付与してください（仕様未定）。
   */
  createLike: LikeSession_createLike | null;
}

export interface LikeSessionVariables {
  randomId: string;
  sessionId: string;
}
